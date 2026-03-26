import { chromium, Browser, Page } from 'playwright';
import { prisma } from '../config/prisma.js';
import { logger } from '../utils/logger.js';

export class ScraperService {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
    logger.info('Playwright browser initialized.');
  }

  async scrapeProducts(url: string) {
    if (!this.page) throw new Error('Browser not initialized');

    try {
      logger.info(`Starting scrape on: ${url}`);
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      
      const products = await this.page.evaluate(() => {
        // Adaptado para la tienda de pruebas scrapeme.live/shop/
        const items = document.querySelectorAll('li.product');
        const results = [];
        for (const item of Array.from(items)) {
          const name = item.querySelector('h2.woocommerce-loop-product__title')?.textContent?.trim();
          const priceText = item.querySelector('.woocommerce-Price-amount')?.textContent?.replace(/[^0-9.-]+/g, '');
          const imgUrl = (item.querySelector('img') as HTMLImageElement)?.src;
          
          if (name && priceText) {
            results.push({
              name,
              price: parseFloat(priceText),
              imageUrl: imgUrl || null,
              description: 'Exclusiva figura de colección, ideal para fanáticos. Detalles en alta calidad.',
              stock: Math.floor(Math.random() * 20) + 1
            });
          }
        }
        return results;
      });

      logger.info(`Found ${products.length} products. Saving to database...`);
      
      for (const prod of products) {
        await prisma.product.create({
          data: prod
        });
      }
      
      logger.info('Products saved successfully.');
    } catch (error) {
      logger.error('Error during scraping:', error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      logger.info('Playwright browser closed.');
    }
    await prisma.$disconnect();
  }
}
