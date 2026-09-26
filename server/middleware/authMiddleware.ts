import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Middleware ensuring caller presents a valid Firebase ID Token
 * and belongs to the root `platform_admins` collection in Firestore.
 */
export const requireSuperAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header with Bearer token',
    });
    return;
  }

  const token = authHeader.split('Bearer ')[1].trim();

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    const db = getFirestore();

    const adminDoc = await db.collection('platform_admins').doc(decodedToken.uid).get();

    if (!adminDoc.exists) {
      res.status(403).json({
        error: 'Forbidden',
        message: 'Access restricted: User is not authorized in platform_admins registry',
      });
      return;
    }

    req.user = decodedToken;
    next();
  } catch (error: any) {
    console.error('[AuthMiddleware] Token verification failed:', error?.message || error);
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid, expired, or revoked authentication token',
    });
  }
};
