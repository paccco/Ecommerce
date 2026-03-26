import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    logger.warn('Acceso denegado: No hay token JWT en las cookies');
    if (req.accepts('html')) {
        res.redirect('/login');
    } else {
        res.status(401).json({ error: 'Acceso denegado. Autenticación requerida.' });
    }
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ecommerce_secret_super_seguro');
    (req as any).user = decoded;
    next();
  } catch (error) {
    logger.error('Token JWT inválido o expirado', error);
    if (req.accepts('html')) {
        res.redirect('/login');
    } else {
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
  }
};
