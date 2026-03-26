import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/api/product.api.controller.js';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);

export default router;
