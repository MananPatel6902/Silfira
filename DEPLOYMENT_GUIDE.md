# Silfira Realtors - Deployment Guide

This guide will help you deploy your Silfira Realtors website to Netlify.

## Prerequisites

- A Netlify account (free tier is sufficient)
- Your code in a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy to Netlify

### Option 1: Automated Deployment (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://www.netlify.com/) and sign in
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   - Netlify will automatically detect the `netlify.toml` file
   - Build settings will be configured automatically:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/build`
   - Click "Deploy site"

4. **Done!**
   - Your site will be live in 2-3 minutes
   - Netlify will give you a URL like `https://your-site-name.netlify.app`
   - You can customize this URL or add your own domain

### Option 2: Manual Deployment

1. **Build the project locally**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy using Netlify CLI**
   ```bash
   # Install Netlify CLI (one-time setup)
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy
   netlify deploy --prod --dir=build
   ```

## Managing Your Site

### Viewing Form Submissions

All form submissions (Contact, Valuation, Property Inquiries) are automatically captured by Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Click on the "Forms" tab
4. You'll see all submissions organized by form type

### Setting Up Email Notifications

To receive emails when someone submits a form:

1. In Netlify dashboard → Your site → Forms
2. Click on "Form notifications"
3. Click "Add notification" → "Email notification"
4. Enter your email address
5. Select which forms to receive notifications for

### Updating Content

To update property listings, agent info, or testimonials:

1. Edit `frontend/src/mock.js`
2. Commit and push your changes:
   ```bash
   git add frontend/src/mock.js
   git commit -m "Update properties"
   git push
   ```
3. Netlify will automatically rebuild and deploy your site

### Custom Domain

To use your own domain (e.g., www.silfirarealtors.com):

1. Go to Netlify dashboard → Your site → Domain settings
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS settings

## Troubleshooting

### Forms not working?

Ensure that:
- Your form tags have `data-netlify="true"` attribute
- Each form has a unique `name` attribute
- Hidden input with `name="form-name"` exists in each form

### Build failures?

Check that:
- All dependencies are listed in `frontend/package.json`
- No environment-specific code is in your build
- Run `npm run build` locally to test for errors

### Routing issues (404 on refresh)?

The `netlify.toml` file should have:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures React Router works correctly.

## Performance Tips

1. **Optimize images**: Use compressed images or CDN-hosted images (already done with Unsplash)
2. **Enable HTTPS**: Automatically enabled by Netlify
3. **Custom headers**: Add caching headers in `netlify.toml` if needed
4. **Analytics**: Enable Netlify Analytics for visitor insights

## Support

- Netlify Documentation: https://docs.netlify.com/
- Netlify Community: https://answers.netlify.com/
- React Documentation: https://react.dev/

---

**Silfira Realtors** - A clean, frontend-only static site with Netlify Forms handling all form submissions.
