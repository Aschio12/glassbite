import sys

with open('src/data/menuData.js', 'r') as f:
    content = f.read()

new_items = """
  {
    id: 'sweet-potato-fries',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries served with a side of aioli dip.',
    specs: { calories: 430, prepTime: '8 min', size: 'Medium Basket' },
    price: 5.5,
    image: '/images/side_sweet_potato_v3.png',
    category: 'sides',
    addOns: [],
  }
];
"""

# Replace the last `];` in the file. 
idx = content.rfind('];')
if idx != -1:
    content = content[:idx] + ',' + new_items
    with open('src/data/menuData.js', 'w') as f:
        f.write(content)
    print("Updated menuData.js successfully")
else:
    print("Could not find ending array bracket")
