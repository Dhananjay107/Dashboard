# Netlify Deployment Guide

This guide will help you deploy your Next.js dashboard project to Netlify.

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. A Netlify account (free tier available)
3. Your project code in a Git repository

## Deployment Steps

### Method 1: Deploy from Git Repository (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   Netlify should automatically detect your settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: 18

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your site automatically

### Method 2: Manual Deploy

1. **Build your project locally**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy the `out` folder**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder to the deploy area
   - Your site will be live instantly

## Configuration Files

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### package.json
The build script is configured to work with Next.js static export:
```json
{
  "scripts": {
    "build": "next build",
    "export": "next build && next export"
  }
}
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML export
};

module.exports = nextConfig;
```

## Important Notes

1. **Static Export**: Your Next.js app is configured for static export, which means:
   - No server-side rendering at runtime
   - No API routes (use external APIs instead)
   - All pages are pre-rendered at build time

2. **Routing**: The `netlify.toml` includes redirects to handle client-side routing:
   - All routes (`/*`) redirect to `/index.html` with a 200 status
   - This enables React Router to handle routing on the client side

3. **Environment Variables**: If you need environment variables:
   - Add them in Netlify dashboard under Site settings → Environment variables
   - Prefix client-side variables with `NEXT_PUBLIC_`

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Netlify will provide SSL certificate automatically

## Continuous Deployment

Once connected to Git:
- Every push to your main branch triggers a new deployment
- You can set up branch deploys for preview deployments
- Deploy logs are available in the Netlify dashboard

## Troubleshooting

### Build Failures
- Check the deploy logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Routing Issues
- Make sure `netlify.toml` redirects are properly configured
- Check that `next.config.js` has `output: 'export'`

### Environment Variables
- Ensure variables are set in Netlify dashboard
- Use `NEXT_PUBLIC_` prefix for client-side variables

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
