# GlassBite

A cinematic, glassmorphic fast-food ordering experience — burgers, pizzas, sides and drinks served on floating 3D glass pedestals, with GSAP-driven motion throughout.

## Tech stack

- **Vite + React** (JavaScript)
- **Tailwind CSS v3** (PostCSS + autoprefixer, classic `tailwind.config.js`)
- **GSAP** — entrance choreography, lerped pointer tilt (`gsap.quickTo`), staggered filter re-animations, drawer/modal transitions
- **lucide-react** — iconography
- Real HD food photography via the Unsplash CDN

## Features

- Floating glassmorphic navbar with a cart badge that scale-pops on every change
- Hero with a cursor/touch-tracked floating food item (3D tilt + translate, 60fps transform-only)
- Glowing glass category filter pills with a sliding active indicator
- Menu cards as 3D glass pedestals — the food floats above a glass base, lifts and tilts from pointer position, casts an ambient glow shadow
- Item detail modal with floating-ingredient depth layers (parallax image stacks at different `translateZ`), add-ons, quantity and live price totals
- Slide-out glass cart drawer with quantity controls, animated line removal, subtotal, 8% tax and checkout
- Escape key closes overlays; body scroll locks while modal/drawer is open

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
├── data/menuData.js          # centralised menu catalogue (items, add-ons, tax rate)
├── components/
│   ├── Navbar.jsx            # floating glass header + animated cart badge
│   ├── Hero.jsx              # cursor-tracked floating hero item
│   ├── CategoryFilter.jsx    # glowing glass filter pills
│   ├── MenuGrid.jsx          # GSAP stagger re-animation on filter change
│   ├── MenuCard.jsx          # 3D tilt glass pedestal card
│   ├── ItemModal.jsx         # depth-layer detail modal
│   └── CartDrawer.jsx        # slide-out glass cart
├── App.jsx                   # cart state + layout wiring
└── index.css                 # Tailwind directives + glass utilities + gradient mesh
```
