import { Router } from 'express';
import { viewCart, addToCart, clearCart, checkout } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      (req as any).user = jwt.verify(token, process.env.JWT_SECRET || 'ecommerce_secret_super_seguro');
    } catch (e) { }
  }
  next();
});

router.get('/', viewCart);
router.post('/agregar', addToCart);
router.post('/vaciar', clearCart);
router.post('/checkout', authMiddleware, checkout);

export default router;
