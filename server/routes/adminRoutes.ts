import { Router, Response } from 'express';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { requireSuperAdmin, AuthenticatedRequest } from '../middleware/authMiddleware';

const router = Router();

/**
 * Slugify string helper for generating URL-safe tenant IDs
 */
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * POST /api/admin/tenants
 * Provision a new Mandir tenant partition in Firestore
 */
router.post('/tenants', requireSuperAdmin, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, location, state, tier, custodian } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Tenant name is required',
      });
      return;
    }

    // Generate unique tenantId and code
    const slug = generateSlug(name) || 'mandir';
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const tenantId = `ws-${slug}-${randomSuffix}`;

    const codePrefix = name
      .split(' ')
      .filter(Boolean)
      .map((w: string) => w[0].toUpperCase())
      .slice(0, 3)
      .join('') || 'MND';
    const code = `${codePrefix}-${(location || 'IND').slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;

    const newTenant = {
      id: tenantId,
      name: name.trim(),
      location: (location || 'India').trim(),
      state: (state || 'Dharmic Kshetra').trim(),
      tier: tier || 'Standard',
      custodian: (custodian || 'Chief Trustee').trim(),
      code,
      status: 'Active',
      createdAt: new Date(),
      createdTimestamp: FieldValue.serverTimestamp(),
      createdBy: req.user?.uid || 'superadmin',
    };

    const db = getFirestore();
    await db.collection('tenants').doc(tenantId).set(newTenant);

    console.log(`[AdminRoutes] Provisioned new tenant partition: ${tenantId} (${code})`);

    res.status(201).json({
      success: true,
      message: 'Tenant partition provisioned successfully',
      tenant: newTenant,
    });
  } catch (error: any) {
    console.error('[AdminRoutes] Error provisioning tenant:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'Failed to provision tenant in database',
    });
  }
});

export default router;
