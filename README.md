# Silfira Realtors

A modern, luxury real estate website showcasing premium properties. Built with React and deployed on Netlify.

![Silfira Realtors](https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80)

## Features

- **Property Listings**: Browse luxury properties with detailed information, images, and filtering
- **Agent Profiles**: Meet our expert real estate agents
- **Property Valuation**: Request free property valuations
- **Contact Forms**: Easy inquiry and contact forms powered by Netlify Forms
- **Responsive Design**: Optimized for all devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Form Handling**: Netlify Forms
- **Deployment**: Netlify
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd silfira-realtors
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
cd frontend
npm run build
```

The build folder will contain the production-ready static files.

## Deployment

This project is configured for **Netlify** deployment. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## Managing Content

### Updating Properties

To add, edit, or remove property listings, edit `frontend/src/mock.js`:

```javascript
export const properties = [
  {
    id: '1',
    title: 'Your Property Title',
    type: 'villa', // villa, penthouse, house, apartment, estate, loft
    status: 'for-sale', // for-sale, for-rent
    price: 2850000,
    location: 'City, State',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    // ... more fields
  }
];
```

### Managing Agents

Edit the `agents` array in `frontend/src/mock.js`:

```javascript
export const agents = [
  {
    id: 'agent1',
    name: 'Agent Name',
    title: 'Agent Title',
    email: 'agent@email.com',
    // ... more fields
  }
];
```

### Form Submissions

All form submissions are captured in your Netlify dashboard:
1. Log in to Netlify
2. Select your site
3. Go to Forms tab
4. View and export submissions

## Project Structure

```
silfira-realtors/
├── frontend/
│   ├── public/
│   │   ├── data.json          # Alternative JSON data format
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Properties.jsx
│   │   │   ├── PropertyDetail.jsx
│   │   │   ├── Agents.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Valuation.jsx
│   │   │   └── About.jsx
│   │   ├── mock.js           # Static data (EDIT THIS)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/                   # Legacy (NOT USED)
├── netlify.toml              # Netlify configuration
├── DEPLOYMENT_GUIDE.md       # Deployment instructions
├── CLAUDE.md                 # Developer documentation
└── README.md                 # This file
```

## Available Forms

Three contact forms are integrated with Netlify Forms:

1. **Contact Form** (`/contact`) - General inquiries
2. **Valuation Form** (`/valuation`) - Property valuation requests
3. **Property Inquiry** (`/properties/:id`) - Property-specific inquiries

## Customization

### Colors

The site uses a custom color scheme defined in Tailwind CSS. Main colors:
- **Navy**: Primary brand color
- **Gold**: Accent color
- **Cream**: Background highlights

To customize, edit `frontend/src/index.css` and `frontend/tailwind.config.js`.

### Fonts

The site uses:
- **Playfair Display** (serif) - For headings
- **Inter** (sans-serif) - For body text

## License

This project is private and proprietary.

## Support

For issues or questions, please contact [rohan@silfirarealtors.com](mailto:rohan@silfirarealtors.com).

---

**Note**: The `backend` folder contains legacy code and is not used in the current deployment. This is a frontend-only static site.
