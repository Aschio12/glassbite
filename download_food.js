const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  burger: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac_hamburger_with_clear_background.png',
  steak: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Omaha_Steaks_Filet_Mignon.png/800px-Omaha_Steaks_Filet_Mignon.png',
  salad: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Salad.png/800px-Salad.png',
  wine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Red_Wine_Glass.png/800px-Red_Wine_Glass.png',
  cake: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Chocolate_cake_with_strawberries.png/800px-Chocolate_cake_with_strawberries.png',
  pizza: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
  fries: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fries_2.png/800px-Fries_2.png',
  cocktail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Margarita_%28cocktail%29.png/800px-Margarita_%28cocktail%29.png'
};

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

Object.entries(images).forEach(([name, url]) => {
  const ext = url.split('.').pop().split('/')[0] || 'png';
  const file = fs.createWriteStream(path.join(dir, `${name}.${ext}`));
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}`);
    });
  }).on('error', (err) => {
    fs.unlinkSync(path.join(dir, `${name}.${ext}`));
    console.error(`Error downloading ${name}: ${err.message}`);
  });
});
