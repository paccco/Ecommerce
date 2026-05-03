import { Request, Response } from 'express';
import { prisma } from '../../config/prisma.js';
import { logger } from '../../utils/logger.js';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const desde = parseInt(req.query.desde as string) || 1;
    const hasta = parseInt(req.query.hasta as string) || 20;
    const ordenacion = req.query.ordenacion === 'descendente' ? 'desc' : 'asc';
    
    // Calcular el offset/limit para Prisma (take/skip)
    const skip = desde > 0 ? desde - 1 : 0;
    const take = hasta - skip;

    const products = await prisma.product.findMany({
      skip,
      take: take > 0 ? take : 20,
      orderBy: {
        price: ordenacion
      }
    });

    logger.info(`API: getProducts solicitada (desde=${desde}, hasta=${hasta}, orden=${ordenacion})`);
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

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;
    
    if (!name || price === undefined) {
      res.status(400).json({ success: false, error: 'Name and price are required' });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: stock ? parseInt(stock) : 0
      }
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    logger.error('Error creating product', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id as string, 10);
    const { name, description, price, imageUrl, stock } = req.body;
    
    if (isNaN(productId)) {
      res.status(400).json({ success: false, error: 'Invalid ID format' });
      return;
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        imageUrl,
        stock: stock ? parseInt(stock) : undefined
      }
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    logger.error('Error updating product', error);
    res.status(500).json({ success: false, error: 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id as string, 10);
    if (isNaN(productId)) {
      res.status(400).json({ success: false, error: 'Invalid ID format' });
      return;
    }

    await prisma.product.delete({
      where: { id: productId }
    });

    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    logger.error('Error deleting product', error);
    res.status(500).json({ success: false, error: 'Error deleting product' });
  }
};

export const getRandomImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      where: { imageUrl: { not: null } }
    });
    
    if(products.length === 0) {
      res.status(404).json({ success: false, error: 'No images found' });
      return;
    }
    
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    res.status(200).json({ success: true, data: { imageUrl: randomProduct.imageUrl, name: randomProduct.name } });
  } catch (error) {
    logger.error('Error fetching random image', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
