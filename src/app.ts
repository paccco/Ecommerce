import express, { Application, Request, Response } from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import authRoutes from './routes/auth.routes.js';
import webRoutes from './routes/web.routes.js';
import cartRoutes from './routes/cart.routes.js';
import apiRoutes from './routes/api.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de Sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
  })
);

// Logging de peticiones HTTP
app.use((req: Request, res: Response, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

// Rutas estáticas
app.use(express.static(path.join(__dirname, '../public')));

// Motor de plantillas Nunjucks
nunjucks.configure(path.join(__dirname, '../views'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV === 'development'
});
app.set('view engine', 'njk');

// Rutas modulares y REST API
app.use('/api/v1', apiRoutes);
app.use('/', webRoutes);
app.use('/carrito', cartRoutes);
app.use('/auth', authRoutes);

// Ruta base
app.get('/', (req: Request, res: Response) => {
  res.redirect('/productos');
});

export default app;
