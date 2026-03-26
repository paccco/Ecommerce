import { Request, Response } from 'express';
import { prisma } from '../../config/prisma.js';
import { logger } from '../../utils/logger.js';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    logger.info('API: getProducts requested');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    logger.error('Error fetching API products', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id as string, 10);
    if (isNaN(productId)) {
        res.status(400).json({ success: false, error: 'Invalid ID format' });
        return;
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    logger.info(`API: getProductById requested for ID ${productId}`);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    logger.error('Error fetching API product detail', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
