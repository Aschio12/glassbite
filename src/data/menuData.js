export const CATEGORIES = [
  { id: 'burgers', label: 'Burgers' },
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'mains', label: 'Mains' },
  { id: 'sides', label: 'Sides' },
  { id: 'desserts', label: 'Desserts' },
];

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const SAUCE_ADDONS = [
  { id: 'truffle-mayo', label: 'Truffle Mayo', price: 1.5 },
  { id: 'house-ember', label: 'House Ember Sauce', price: 1.0 },
  { id: 'garlic-aioli', label: 'Roast Garlic Aioli', price: 1.0 },
];

export const CHEESE_ADDON = { id: 'extra-cheese', label: 'Extra Cheese', price: 1.5 };

const withAddons = (specificAddons = []) => [...specificAddons, ...SAUCE_ADDONS, CHEESE_ADDON];

export const MENU_ITEMS = [
  {
    id: 'wagyu-burger',
    name: 'Wagyu Signature Burger',
    description:
      'Double smashed wagyu patties, molten cheddar, caramelised onion and house sauce on a toasted brioche bun.',
    specs: { calories: 780, prepTime: '12 min', size: 'Double stack' },
    price: 18.5,
    image: '/images/burger.png',
    category: 'burgers',
    addOns: withAddons([{ id: 'bacon', label: 'Crispy Bacon', price: 3.0 }]),
  },
  {
    id: 'classic-burger',
    name: 'Classic Steakhouse Burger',
    description:
      'Flame-grilled beef burger with lettuce, tomato, and pickles.',
    specs: { calories: 940, prepTime: '14 min', size: 'Single stack' },
    price: 14.5,
    image: '/images/burger_2.png',
    category: 'burgers',
    addOns: withAddons([{ id: 'fried-egg', label: 'Fried Egg', price: 2.0 }]),
  },
  {
    id: 'filet-mignon',
    name: 'Prime Filet Mignon',
    description:
      'A delicate, highly prized cut of steak, pan-seared to perfection with a garlic herb butter crust.',
    specs: { calories: 650, prepTime: '20 min', size: '8 oz' },
    price: 42.0,
    image: '/images/steak.png',
    category: 'mains',
    addOns: withAddons([{ id: 'peppercorn', label: 'Peppercorn Sauce', price: 3.5 }]),
  },
  {
    id: 'spicy-pepperoni',
    name: 'Diavola Pizza',
    description:
      'Wood-fired pizza with cup-and-char pepperoni, fior di latte, and a chilli-honey drizzle.',
    specs: { calories: 1120, prepTime: '18 min', size: '12 inch' },
    price: 19.0,
    image: '/images/pizza.png',
    category: 'pizzas',
    addOns: withAddons([{ id: 'burrata', label: 'Fresh Burrata', price: 4.5 }]),
  },
  {
    id: 'truffle-fries',
    name: 'Truffle & Parmesan Fries',
    description:
      'Twice-cooked fries tossed in truffle oil, parmesan snow, and cracked black pepper.',
    specs: { calories: 520, prepTime: '8 min', size: 'Sharing basket' },
    price: 9.0,
    image: '/images/fries.png',
    category: 'sides',
    addOns: [...SAUCE_ADDONS, { id: 'parmesan', label: 'Extra Parmesan', price: 2.0 }],
  },
  {
    id: 'decadent-cake',
    name: 'Black Forest Gateau',
    description:
      'Rich chocolate sponge layered with sweet cherry compote and vanilla chantilly cream.',
    specs: { calories: 640, prepTime: '5 min', size: 'Slice' },
    price: 12.0,
    image: '/images/dessert.png',
    category: 'desserts',
    addOns: [
      { id: 'ice-cream', label: 'Vanilla Bean Ice Cream', price: 3.0 },
    ],
  },
];
