import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { logger } from '../utils/logger.js';

export const viewCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = (req.session as any).cart || [];
    const user = (req as any).user || null;
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

    const added = req.query.added === '1';
    res.render('pages/carrito', { cartItems, total, user, added });
  } catch (error) {
    logger.error('Error visualizando carrito', error);
    res.status(500).send('Error interno');
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity) || 1;

    if (isNaN(productId)) {
        res.status(400).send('ID de producto inválido');
        return;
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      res.status(404).send('Producto no encontrado');
      return;
    }

    const sessionObj = (req.session as any);
    if (!sessionObj.cart) {
      sessionObj.cart = [];
    }

    const existingItem = sessionObj.cart.find((i: any) => i.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      sessionObj.cart.push({ productId, quantity });
    }

    logger.info(`Producto ${productId} añadido al carrito en sesión`);
    res.redirect('/carrito?added=1');
  } catch (error) {
    logger.error('Error añadiendo al carrito', error);
    res.status(500).send('Error interno');
  }
};

export const clearCart = (req: Request, res: Response): void => {
  (req.session as any).cart = [];
  res.redirect('/carrito');
};

export const checkout = async (req: Request, res: Response): Promise<void> => {
   const user = (req as any).user;
   if (!user) {
     res.redirect('/login');
     return;
   }

   const cart = (req.session as any).cart || [];
   if (cart.length === 0) {
     res.redirect('/carrito');
     return;
   }

   try {
     let total = 0;
     const orderItemsData = [];
     
     for (const item of cart) {
        const product = await prisma.product.findUnique({ where: { id: parseInt(item.productId) } });
        if (product) {
          total += product.price * item.quantity;
          orderItemsData.push({
            productId: product.id,
            quantity: item.quantity,
            price: product.price
          });
        }
     }

     const order = await prisma.order.create({
       data: {
         userId: user.id,
         total,
         status: 'PENDING',
         items: {
           create: orderItemsData
         }
       }
     });

     logger.info(`Pedido ${order.id} creado para el usuario ${user.id}`);
     (req.session as any).cart = [];
     
     res.render('pages/checkout_success', { order, user });
   } catch(error) {
     logger.error('Error en proceso de checkout', error);
     res.status(500).send('Error en proceso de pago');
   }
};
