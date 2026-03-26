import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { logger } from '../utils/logger.js';

export const renderProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    const user = (req as any).user || null;

    res.render('pages/productos', { products, user });
  } catch (error) {
    logger.error('Error cargando productos', error);
    res.status(500).send('Error interno cargando el catálogo');
  }
};

export const renderProductDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id as string, 10);
    const product = await prisma.product.findUnique({ where: { id: productId } });
    const user = (req as any).user || null;

    if (!product) {
      res.status(404).render('pages/404', { message: 'Producto no encontrado' });
      return;
    }

    res.render('pages/producto_detalle', { product, user });
  } catch (error) {
    logger.error('Error cargando detalle de producto', error);
    res.status(500).send('Error interno del servidor');
  }
};
