import { Request, Response } from 'express';
import { prisma } from '../../config/prisma.js';
import { logger } from '../../utils/logger.js';

export const getApiCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = (req.session as any).cart || [];
    let total = 0;
    const cartItems = [];

    for (const item of cart) {
      const product = await prisma.product.findUnique({ where: { id: parseInt(item.productId) } });
      if (product) {
        const subtotal = product.price * item.quantity;
        total += subtotal;
        cartItems.push({ product, quantity: item.quantity, subtotal });
      }
    }

    res.status(200).json({ success: true, data: { items: cartItems, total } });
  } catch (error) {
    logger.error('Error fetching API cart', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const deleteApiCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id as string, 10);
    const sessionObj = (req.session as any);
    
    if (sessionObj.cart) {
      sessionObj.cart = sessionObj.cart.filter((i: any) => i.productId !== productId);
    }

    res.status(200).json({ success: true, message: 'Item deleted from cart' });
  } catch (error) {
    logger.error('Error deleting API cart item', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
