import { Router } from 'express';
import { renderProducts, renderProductDetail } from '../controllers/product.controller.js';
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware para inyectar user en req si existe token (para vistas públicas)
router.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      (req as any).user = jwt.verify(token, process.env.JWT_SECRET || 'ecommerce_secret_super_seguro');
    } catch (e) {
      // Ignorar si el token expiró (vista pública)
    }
  }
  next();
});

router.get('/productos', renderProducts);
router.get('/productos/:id', renderProductDetail);

export default router;
