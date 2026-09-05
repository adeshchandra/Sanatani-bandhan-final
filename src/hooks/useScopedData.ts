import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, orderBy as fsOrderBy, limit as fsLimit, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthWorkspace } from '../context/AuthWorkspaceContext';

const useCollection = <T>(
  collectionName: string,
  filters: Record<string, any> = {},
  options: {
    limit?: number;
    orderBy?: { field: string; direction: 'asc' | 'desc' };
    realtime?: boolean;
  } = {}
) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    // If blocked by authorization
    if (filters._unauthorized) {
      setData([]);
      return;
    }

    const constraints: QueryConstraint[] = [];
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
        if (key !== '_unauthorized') {
           constraints.push(where(key, '==', value));
        }
    });

    if (options.orderBy) {
      constraints.push(fsOrderBy(options.orderBy.field, options.orderBy.direction));
    }
    if (options.limit) {
      constraints.push(fsLimit(options.limit));
    }

    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as unknown as T);
      setData(items);
    }, (error) => {
      console.error(`Error fetching useCollection for ${collectionName}:`, error);
    });

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(filters), JSON.stringify(options)]);

  return data;
};

export const useScopedData = <T>(
  collectionName: string,
  customFilters: Record<string, any> = {},
  options: {
    limit?: number;
    orderBy?: { field: string; direction: 'asc' | 'desc' };
    realtime?: boolean;
  } = {}
) => {
  const { currentUser, activeWorkspace } = useAuthWorkspace();
  
  // Build RBAC filters
  const rbacFilters = useMemo(() => {
    if (!currentUser || !activeWorkspace) {
      return { _unauthorized: true };
    }

    const role = currentUser.role;
    const uid = currentUser.id;

    // Always filter by activeWorkspace.id to prevent cross-workspace data leakage
    const baseFilter: Record<string, any> = { workspaceId: activeWorkspace.id };

    // 'audit_logs' collection: Only TRUSTEE/SUPER_ADMIN can access
    if (collectionName === 'audit_logs') {
       if (role !== 'TRUSTEE' && role !== 'SUPER_ADMIN') {
          return { ...baseFilter, _unauthorized: true };
       }
    }

    // ACCOUNTANT, TRUSTEE, SUPER_ADMIN: See all workspace data
    if (role === 'SUPER_ADMIN' || role === 'TRUSTEE' || role === 'ACCOUNTANT') {
      return baseFilter;
    }

    // DEVOTEE: Only see data where devoteeId === currentUser.uid
    if (role === 'DEVOTEE') {
      if (collectionName === 'devotees') {
         return { ...baseFilter, id: uid };
      }
      if (collectionName === 'treasury') {
         return { ...baseFilter, devoteeId: uid };
      }
      if (collectionName === 'pooja_bookings') {
         return { ...baseFilter, devoteeId: uid };
      }
      return { ...baseFilter, devoteeId: uid };
    }

    // PUROHIT: See data where assignedPurohit === currentUser.uid OR workspace data
    if (role === 'PUROHIT') {
      if (collectionName === 'pooja_bookings') {
         return { ...baseFilter, assignedPurohit: uid };
      }
      return baseFilter;
    }

    return baseFilter;
  }, [currentUser, activeWorkspace, collectionName]);
  
  // Merge with custom filters
  const finalFilters = { ...rbacFilters, ...customFilters };
  
  // Use existing useCollection hook with final filters
  return useCollection<T>(collectionName, finalFilters, options);
};
