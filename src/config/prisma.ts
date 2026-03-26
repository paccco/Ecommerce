import { PrismaClient } from '../../prisma/generated/client/index.js';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public';

const pool = new pg.Pool({ connectionString });
// @ts-ignore
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
