import sys

with open('src/data/menuData.js', 'r') as f:
    content = f.read()

new_items = """
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    description: 'Italian dessert with espresso-soaked ladyfingers and mascarpone.',
    specs: { calories: 510, prepTime: '3 min', size: 'Slice' },
    price: 8.5,
    image: '/images/dessert_tiramisu_v3.png',
    category: 'desserts',
    addOns: [],
  },
  {
    id: 'brownie-sundae',
    name: 'Brownie Sundae',
    description: 'Warm chocolate brownie topped with ice cream, whipped cream, and a cherry.',
    specs: { calories: 890, prepTime: '5 min', size: 'Large Glass' },
    price: 11.0,
    image: '/images/dessert_sundae_v3.png',
    category: 'desserts',
    addOns: [],
  }
];
"""

# Replace the last `];` in the file. 
# Find the last occurrence of `];`
idx = content.rfind('];')
if idx != -1:
    content = content[:idx] + ',' + new_items
    with open('src/data/menuData.js', 'w') as f:
        f.write(content)
    print("Updated menuData.js successfully")
else:
    print("Could not find ending array bracket")
