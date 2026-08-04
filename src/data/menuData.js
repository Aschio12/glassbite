// Centralized menu catalogue for GlassBite.
// All imagery is served from the Unsplash CDN (real HD food photography).

const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const CHEESE_ADDON = { id: 'extra-cheese', label: 'Extra Cheese', price: 1.5 };
const SAUCE_ADDONS = [
  { id: 'sauce-bbq', label: 'Smoky BBQ Sauce', price: 0.75 },
  { id: 'sauce-garlic', label: 'Garlic Aioli', price: 0.75 },
  { id: 'sauce-fire', label: 'Fire Chipotle Sauce', price: 0.85 },
  { id: 'sauce-truffle', label: 'Truffle Mayo', price: 1.25 },
];

const withAddons = (extras = []) => [CHEESE_ADDON, ...SAUCE_ADDONS, ...extras];

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
];

export const MENU_ITEMS = [
  {
    id: 'burger-ember-classic',
    title: 'Ember Classic Smash',
    description:
      'Double smashed wagyu patties, molten cheddar, caramelised onion and house ember sauce on a toasted brioche bun.',
    specs: { calories: 780, prepTime: '12 min', size: 'Double stack' },
    price: 12.9,
    image: img('1568901346375-23c9450c58cd'),
    category: 'burgers',
    addOns: withAddons([{ id: 'bacon', label: 'Crispy Bacon', price: 2.0 }]),
  },
  {
    id: 'burger-golden-fries-combo',
    title: 'Golden Hour Combo',
    description:
      'Flame-grilled beef burger with lettuce, tomato and pickles, served over a bed of skin-on golden fries.',
    specs: { calories: 940, prepTime: '14 min', size: 'Combo meal' },
    price: 14.5,
    image: img('1571091718767-18b5b1457add'),
    category: 'burgers',
    addOns: withAddons([{ id: 'fried-egg', label: 'Fried Egg', price: 1.4 }]),
  },
  {
    id: 'burger-lava-melt',
    title: 'Lava Melt Burger',
    description:
      'A towering cheese-pull burger dripping with a four-cheese lava core, jalapeños and chipotle glaze.',
    specs: { calories: 860, prepTime: '15 min', size: 'Single, stuffed' },
    price: 13.75,
    image: img('1551782450-a2132b4ba21d'),
    category: 'burgers',
    addOns: withAddons([{ id: 'jalapeno', label: 'Extra Jalapeños', price: 0.9 }]),
  },
  {
    id: 'burger-midnight-stack',
    title: 'Midnight Stack',
    description:
      'Charcoal-bun tower with double beef, smoked gouda, crispy shallots and a black garlic glaze.',
    specs: { calories: 910, prepTime: '16 min', size: 'Triple layer' },
    price: 15.25,
    image: img('1550547660-d9450f859349'),
    category: 'burgers',
    addOns: withAddons([{ id: 'onion-rings', label: 'Onion Rings Inside', price: 1.8 }]),
  },
  {
    id: 'pizza-neon-pepperoni',
    title: 'Neon Pepperoni Blaze',
    description:
      'Wood-fired pepperoni pizza with cup-and-char pepperoni, fior di latte and a chilli-honey drizzle.',
    specs: { calories: 1120, prepTime: '18 min', size: '12 inch' },
    price: 16.9,
    image: img('1574071318508-1cdbab80d002'),
    category: 'pizzas',
    addOns: withAddons([{ id: 'stuffed-crust', label: 'Stuffed Crust', price: 2.5 }]),
  },
  {
    id: 'pizza-margherita-glass',
    title: 'Margherita Cristallo',
    description:
      'San Marzano tomato, fresh basil and buffalo mozzarella over a leopard-spotted neapolitan crust.',
    specs: { calories: 980, prepTime: '16 min', size: '12 inch' },
    price: 14.9,
    image: img('1513104890138-7c749659a591'),
    category: 'pizzas',
    addOns: withAddons([{ id: 'burrata', label: 'Fresh Burrata', price: 3.0 }]),
  },
  {
    id: 'pizza-garden-ember',
    title: 'Garden Ember Slice',
    description:
      'Roasted peppers, red onion, olives and basil on a blistered crust with smoked mozzarella.',
    specs: { calories: 890, prepTime: '15 min', size: '12 inch' },
    price: 15.4,
    image: img('1565299624946-b28f40a0ae38'),
    category: 'pizzas',
    addOns: withAddons([{ id: 'mushrooms', label: 'Roasted Mushrooms', price: 1.6 }]),
  },
  {
    id: 'side-truffle-fries',
    title: 'Truffle Ember Fries',
    description:
      'Twice-cooked fries tossed in truffle oil, parmesan snow and cracked black pepper.',
    specs: { calories: 520, prepTime: '8 min', size: 'Sharing basket' },
    price: 7.25,
    image: img('1573080496219-bb080dd4f877'),
    category: 'sides',
    addOns: [...SAUCE_ADDONS, { id: 'parmesan', label: 'Extra Parmesan', price: 1.2 }],
  },
  {
    id: 'side-crispy-classic-fries',
    title: 'Crispy Classic Fries',
    description:
      'Golden shoestring fries with flaky sea salt, served straight out of the fryer with ketchup.',
    specs: { calories: 430, prepTime: '6 min', size: 'Regular' },
    price: 4.9,
    image: img('1541592106381-b31e9677c0e5'),
    category: 'sides',
    addOns: [...SAUCE_ADDONS, { id: 'cheese-dip', label: 'Cheese Dip', price: 1.5 }],
  },
  {
    id: 'side-smokehouse-dog',
    title: 'Smokehouse Fire Dog',
    description:
      'Char-grilled smokehouse hot dog with crispy onions, relish and a streak of ember mustard.',
    specs: { calories: 610, prepTime: '9 min', size: 'Footlong' },
    price: 8.5,
    image: img('1626082927389-6cd097cdc6ec'),
    category: 'sides',
    addOns: [...SAUCE_ADDONS, CHEESE_ADDON],
  },
  {
    id: 'drink-velvet-shake',
    title: 'Velvet Cloud Shake',
    description:
      'Thick-spun vanilla bean milkshake crowned with torched marshmallow and a caramel drizzle.',
    specs: { calories: 640, prepTime: '5 min', size: '500 ml' },
    price: 6.75,
    image: img('1572490122747-3968b75cc699'),
    category: 'drinks',
    addOns: [
      { id: 'whipped-cream', label: 'Extra Whipped Cream', price: 0.8 },
      { id: 'oreo-crumb', label: 'Cookie Crumb', price: 0.9 },
    ],
  },
  {
    id: 'drink-iced-ember-cola',
    title: 'Iced Ember Cooler',
    description:
      'Ice-cold sparkling cooler with citrus, crushed ice and a frosted-glass condensation chill.',
    specs: { calories: 180, prepTime: '3 min', size: '400 ml' },
    price: 3.9,
    image: img('1581636625402-29b2a704ef13'),
    category: 'drinks',
    addOns: [
      { id: 'lime', label: 'Fresh Lime', price: 0.4 },
      { id: 'mint', label: 'Mint Sprig', price: 0.4 },
    ],
  },
];

export const TAX_RATE = 0.08;

export const formatPrice = (value) => `$${value.toFixed(2)}`;
