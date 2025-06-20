import { Router } from 'express';

const router = Router();

// Basic users endpoint
router.get('/', async (req, res) => {
  res.json({ message: 'Users endpoint' });
});

export default router; 