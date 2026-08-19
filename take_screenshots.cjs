const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
    protocolTimeout: 120000
  });
  
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('http://localhost:5173', ['geolocation']);

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setGeolocation({ latitude: 9.020, longitude: 38.745 });

  const wait = ms => new Promise(r => setTimeout(r, ms));

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  // 1. Landing Page (Wait a massive 20 seconds to ensure the network loads everything and loading screen finishes)
  console.log('Waiting for landing page to fully load...');
  await wait(20000); 
  console.log('Taking Landing Page screenshot...');
  await page.screenshot({ path: 'public/screenshots/landing_page.png' });

  // 2. Menu Page (Section 1)
  console.log('Scrolling to first menu section...');
  await page.evaluate(() => window.scrollTo(0, 900));
  await wait(8000); // wait for images to load
  await page.screenshot({ path: 'public/screenshots/menu_section_1.png' });

  // 3. Menu Page (Section 2)
  console.log('Scrolling to second menu section...');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await wait(8000); // wait for images to load
  await page.screenshot({ path: 'public/screenshots/menu_section_2.png' });

  // 4. Detail Page (Non-burger)
  console.log('Opening a non-burger detail modal...');
  await page.evaluate(() => {
    // Find a card that is NOT a burger (e.g., Pizza or Sushi)
    const cards = Array.from(document.querySelectorAll('.burgerhub-card'));
    const nonBurgerCard = cards.find(card => {
      const text = card.textContent.toLowerCase();
      return text.includes('pizza') || text.includes('sushi') || text.includes('pasta');
    });
    if(nonBurgerCard) nonBurgerCard.click();
  });
  await wait(8000); // Wait for modal image to load
  await page.screenshot({ path: 'public/screenshots/detail_modal.png' });

  // Close modal
  await page.keyboard.press('Escape');
  await wait(2000);

  // 5. Locations Page (After clicking Get Directions)
  console.log('Navigating to Locations...');
  await page.goto('http://localhost:5173/location', { waitUntil: 'domcontentloaded' });
  await wait(15000); // wait for page and loading screen
  
  console.log('Clicking Get Directions...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const dirBtn = btns.find(b => b.textContent.toLowerCase().includes('direction'));
    if(dirBtn) dirBtn.click();
  });
  await wait(8000); // wait for any map/direction changes
  await page.screenshot({ path: 'public/screenshots/locations.png' });

  // 6. About Page
  console.log('Navigating to About...');
  await page.goto('http://localhost:5173/about', { waitUntil: 'domcontentloaded' });
  await wait(15000); // wait for page and loading screen
  await page.screenshot({ path: 'public/screenshots/about.png' });

  await browser.close();
  console.log('Done!');
})();
