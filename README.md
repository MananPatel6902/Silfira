# Silfira Realtors

Marketing website for **Silfira Realtors**, a real estate advisory in Gandhinagar, Gujarat. It presents curated residential projects (Sargasan, Kudasan, Raysan, PDEU · Palm Road) with a scroll-driven, layered visual experience and enquiry forms.

Built with React 18 (Create React App + CRACO), Tailwind CSS, Framer Motion and Lenis smooth scrolling. Forms are handled by Netlify Forms.

## Prerequisites

- **Node.js 18 or newer** (20 LTS recommended)
- **npm 9+** (bundled with Node)

## Quickest way to run

- **macOS:** double-click `start.command` (or run `./start.sh`)
- **Windows:** double-click `start.bat`
- **Linux:** run `./start.sh`

It installs dependencies on first run, then starts the site at http://localhost:3000. Or do it manually:

## Getting started

```bash
npm install      # install dependencies
npm start        # dev server at http://localhost:3000
```

## Production build

```bash
npm run build    # outputs static files to ./build
```

To preview the production build locally:

```bash
npx serve -s build
```

## Environment variables

None are required. `.env.example` lists the only optional setting (`PORT`).

## Project structure

```
silfira-realtors/
├── public/
│   ├── index.html          # HTML shell, fonts, Netlify form definitions, WhatsApp button
│   ├── images/
│   │   ├── v2/, v3/        # optimised WebP artwork (hero layers, properties, lifestyle, brand)
│   │   └── partners_svg/   # developer partner logos
│   └── brochures/          # property brochure PDFs
├── src/
│   ├── pages/              # Home, Properties, PropertyDetail, About, Agents, Contact, Valuation, AdminDashboard
│   ├── components/         # Hero, StreetToSky, Collection, Lifestyle, Neighbourhoods, ClosingScene, Footer, ...
│   │   ├── motion.jsx      # shared motion primitives (Reveal, MaskLines, ParallaxImage, ArchReveal, ...)
│   │   └── ui/             # small shadcn/ui primitives (button, input, textarea, toast)
│   ├── hooks/, lib/        # toast hook, formatting helpers, class utilities
│   ├── mock.js             # property, team, testimonial and partner data
│   └── index.css           # Tailwind layers, design tokens, global effects
├── docs/                   # design plan and image-generation prompt packs
├── start.command / start.sh / start.bat   # one-click launchers
├── craco.config.js         # "@/..." import alias
├── tailwind.config.js
└── netlify.toml            # build + SPA redirect for Netlify
```

## Editing content

- **Properties, team, testimonials, partners:** `src/mock.js`
- **Images:** `public/images/` (referenced by absolute paths such as `/images/v3/hero-towers.webp`)
- **Brand colours and global styles:** `tailwind.config.js` and `src/index.css`

## Deployment (Netlify)

The repository root is the site root. Netlify reads `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `build`
- All routes rewrite to `index.html` (client-side routing)

## External services

- **Netlify Forms:** the contact, valuation, property-enquiry and newsletter forms post to Netlify. They only work when deployed on Netlify; locally they appear to succeed but nothing is stored. The hidden `<form>` blocks in `public/index.html` must stay so Netlify can detect the forms. Submissions appear under *Site → Forms* in the Netlify dashboard.
- **Google Fonts:** Gelasio and Inter are loaded from fonts.googleapis.com.
- **WhatsApp:** the floating button links to `wa.me/919712345802`.

## Notes

- `/admin` is a front-end demo dashboard that works on mock data. It has no authentication, so do not put real data behind it as is.
- Property imagery is AI-generated and labelled "Representative image" on the site. The two "photo booth" images and the advisor portraits are real photographs.
- Respects `prefers-reduced-motion`: smooth scrolling, the intro screen and decorative animations are reduced.
