const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const wait = ms => new Promise(r => setTimeout(r, ms));

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  // Wait for loading screen to finish
  await wait(5000); 

  // 1. Hero Section
  console.log('Taking Hero screenshot...');
  await page.screenshot({ path: 'public/screenshots/hero.png' });

  // 2. Menu Section
  console.log('Scrolling to menu...');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await wait(2000);
  await page.screenshot({ path: 'public/screenshots/menu.png' });

  // 3. Item Modal
  console.log('Clicking an item...');
  await page.evaluate(() => {
    const cards = document.querySelectorAll('.burgerhub-card');
    if(cards.length > 0) cards[0].click();
  });
  await wait(1500);
  await page.screenshot({ path: 'public/screenshots/modal.png' });

  // Close modal
  await page.keyboard.press('Escape');
  await wait(1000);

  // 4. Cart Drawer
  console.log('Opening cart...');
  // Find and click cart button (in header)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cartBtn = btns.find(b => b.textContent.includes('Cart'));
    if(cartBtn) cartBtn.click();
  });
  await wait(1500);
  await page.screenshot({ path: 'public/screenshots/cart.png' });

  // Close cart
  await page.keyboard.press('Escape');
  await wait(1000);

  // 5. Locations Page
  console.log('Navigating to Locations...');
  await page.goto('http://localhost:5173/location', { waitUntil: 'domcontentloaded' });
  await wait(2000);
  await page.screenshot({ path: 'public/screenshots/locations.png' });

  await browser.close();
  console.log('Done!');
})();
