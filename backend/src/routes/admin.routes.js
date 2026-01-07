import { Router } from 'express';
import { requireAuth } from '../auth/auth.middleware.js';
import { requireRole } from '../auth/role.middleware.js';

const router = Router();

router.get(
  '/',
  requireAuth,
  requireRole(['ADMIN']),
  (req, res) => {
    res.json({ message: 'Welcome Admin' });
  }
);

export default router;
