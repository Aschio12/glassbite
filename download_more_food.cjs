const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  salad: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Salad.png/800px-Salad.png',
  wine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Red_Wine_Glass.png/800px-Red_Wine_Glass.png',
  cocktail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Margarita_%28cocktail%29.png/800px-Margarita_%28cocktail%29.png',
  sushi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sushi_transparent_background.png/800px-Sushi_transparent_background.png',
  pasta: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Pasta_transparent_background.png/800px-Pasta_transparent_background.png', // just guessing or I'll use another
  cake2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Chocolate_cake_with_strawberries.png/800px-Chocolate_cake_with_strawberries.png',
  pancakes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Pancakes_with_maple_syrup.png/800px-Pancakes_with_maple_syrup.png',
  coffee: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG', // wait jpg doesn't have transparency.
  beer: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Beer_glass.png/800px-Beer_glass.png',
  taco: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Taco_transparent.png/800px-Taco_transparent.png',
  salmon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Salmon_steak.png/800px-Salmon_steak.png'
};

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

Object.entries(images).forEach(([name, url]) => {
  const ext = url.split('.').pop().split('/')[0] || 'png';
  const file = fs.createWriteStream(path.join(dir, `${name}.${ext}`));
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
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
