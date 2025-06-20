import { Router } from 'express';

const router = Router();

// Basic restaurants endpoint
router.get('/', async (req, res) => {
  res.json({ message: 'Restaurants endpoint' });
});

export default router; 