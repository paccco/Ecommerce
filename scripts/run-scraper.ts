import { ScraperService } from '../src/services/scraper.service.js';
import { logger } from '../src/utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const URL_TO_SCRAPE = process.env.SCRAPER_URL || 'https://scrapeme.live/shop/';

async function main() {
  const scraper = new ScraperService();
  try {
    await scraper.init();
    await scraper.scrapeProducts(URL_TO_SCRAPE);
  } catch (error) {
    logger.error('Scraping script failed', error);
  } finally {
    await scraper.close();
  }
}

main();
