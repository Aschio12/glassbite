import sys

with open('src/data/menuData.js', 'r') as f:
    content = f.read()

# Replace v2 with v3
content = content.replace('_v2.png', '_v3.png')

new_items = """
  {
    id: 'iced-coffee',
    name: 'Vanilla Iced Coffee',
    description: 'Freshly brewed espresso over ice with swirling vanilla milk.',
    specs: { calories: 180, prepTime: '4 min', size: 'Tall' },
    price: 5.5,
    image: '/images/drink_iced_coffee_v3.png',
    category: 'drinks',
    addOns: [],
  },
  {
    id: 'refreshing-lemonade',
    name: 'Mint Lemonade',
    description: 'Freshly squeezed lemons with a hint of mint, served ice cold.',
    specs: { calories: 120, prepTime: '3 min', size: 'Tall' },
    price: 4.5,
    image: '/images/drink_lemonade_v3.png',
    category: 'drinks',
    addOns: [],
  },
  {
    id: 'matcha-latte',
    name: 'Iced Matcha Latte',
    description: 'Premium ceremonial grade matcha over ice and creamy oat milk.',
    specs: { calories: 160, prepTime: '5 min', size: 'Tall' },
    price: 6.0,
    image: '/images/drink_matcha_v3.png',
    category: 'drinks',
    addOns: [],
  },
  {
    id: 'sushi-platter',
    name: 'Salmon Avocado Sushi',
    description: 'Premium salmon and avocado rolls served with soy sauce and ginger.',
    specs: { calories: 540, prepTime: '10 min', size: '10 Pieces' },
    price: 18.0,
    image: '/images/food_sushi_v3.png',
    category: 'mains',
    addOns: [],
  },
  {
    id: 'strawberry-cheesecake',
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake slice topped with fresh strawberry glaze.',
    specs: { calories: 580, prepTime: '3 min', size: 'Slice' },
    price: 9.5,
    image: '/images/dessert_cheesecake_v3.png',
    category: 'desserts',
    addOns: [],
  }
];
"""

content = content.replace('];', ',') + new_items

with open('src/data/menuData.js', 'w') as f:
    f.write(content)

print("Updated menuData.js")
