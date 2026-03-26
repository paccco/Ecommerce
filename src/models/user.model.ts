import { prisma } from '../config/prisma.js';
import crypto from 'crypto';

export class UserModel {
  
  static hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  static verifyPassword(passwordPlain: string, hashed: string): boolean {
    const [salt, key] = hashed.split(':');
    const hashBuffer = crypto.scryptSync(passwordPlain, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    return crypto.timingSafeEqual(hashBuffer, keyBuffer);
  }

  static async createUser(email: string, passwordPlain: string, name?: string) {
    const hashedPassword = this.hashPassword(passwordPlain);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER'
      }
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }
}
