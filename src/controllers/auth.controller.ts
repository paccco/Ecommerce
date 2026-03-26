import { Request, Response } from 'express';
import { UserModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

export const renderLogin = (req: Request, res: Response): void => {
  res.render('pages/login', { error: null });
};

export const renderRegister = (req: Request, res: Response): void => {
  res.render('pages/register', { error: null });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);

    if (!user || !UserModel.verifyPassword(password, user.password)) {
       if (req.accepts('html')) {
          res.render('pages/login', { error: 'Credenciales inválidas. Verifica tu correo y contraseña.' });
       } else {
          res.status(401).json({ error: 'Credenciales inválidas' });
       }
       return;
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'ecommerce_secret_super_seguro', {
      expiresIn: '1d'
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 // 1 día
    });

    logger.info(`Usuario logueado: ${email}`);
    if (req.accepts('html')) {
        res.redirect('/productos');
    } else {
        res.status(200).json({ message: 'Login exitoso', redirectUrl: '/productos' });
    }
  } catch (error) {
    logger.error('Error en proceso login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !email.includes('@')) {
      if (req.accepts('html')) return void res.render('pages/register', { error: '❌ Formato de correo electrónico inválido.' });
      return void res.status(400).json({ error: 'Email inválido' });
    }
    
    if (!password || password.length < 6) {
      if (req.accepts('html')) return void res.render('pages/register', { error: '❌ La contraseña es demasiado corta. Debe tener al menos 6 caracteres.' });
      return void res.status(400).json({ error: 'Contraseña muy corta' });
    }
    
    if (!name || name.trim().length === 0) {
      if (req.accepts('html')) return void res.render('pages/register', { error: '❌ El nombre completo es obligatorio.' });
      return void res.status(400).json({ error: 'Nombre obligatorio' });
    }

    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      if (req.accepts('html')) {
         res.render('pages/register', { error: 'El email ya se encuentra en uso.' });
      } else {
         res.status(400).json({ error: 'El email ya está registrado' });
      }
      return;
    }

    await UserModel.createUser(email, password, name);
    logger.info(`Nuevo usuario registrado: ${email}`);
    
    if (req.accepts('html')) {
        res.redirect('/auth/login');
    } else {
        res.status(201).json({ message: 'Usuario creado exitosamente', redirectUrl: '/auth/login' });
    }
  } catch (error) {
    logger.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token');
  logger.info('Usuario cerró sesión');
  res.redirect('/auth/login');
};
