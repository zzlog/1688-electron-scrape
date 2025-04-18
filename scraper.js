const puppeteer = require('puppeteer');

async function scrape1688(url) {
  const browser = await puppeteer.launch({
    executablePath: puppeteer.executablePath(),
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const data = await page.evaluate(() => {
      const title = document.querySelector('h1')?.innerText || '';
      const price = document.querySelector('.price-original-sku span')?.innerText ||
                    document.querySelector('.price')?.innerText || '';
      const img = document.querySelector('.mod-detail-gallery img')?.src ||
                  document.querySelector('img')?.src || '';

      return {
        title,
        price,
        img,
      };
    });

    await browser.close();
    return data;
  } catch (err) {
    await browser.close();
    return { error: '抓取失败: ' + err.message };
  }
}

module.exports = scrape1688;
