import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getRandomImage } from '../controllers/api/product.api.controller.js';
import { getApiCart, deleteApiCartItem } from '../controllers/api/cart.api.controller.js';

const router = Router();

router.get('/productos', getProducts);
router.get('/productos/:id', getProductById);
router.post('/productos', createProduct);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);
router.get('/random-image', getRandomImage);

// API Carrito (Offcanvas DOM)
router.get('/carrito', getApiCart);
router.delete('/carrito/:id', deleteApiCartItem);

export default router;
