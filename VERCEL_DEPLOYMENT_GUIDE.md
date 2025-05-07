# Deploying ELEVEN Website to Vercel

This guide explains how to deploy your ELEVEN website to Vercel while keeping the bot separate.

## Prerequisites

1. Create a [Vercel](https://vercel.com) account if you don't have one
2. Install the Vercel CLI (optional): `npm install -g vercel`
3. Have your GitHub repository ready

## Deployment Steps

### Option 1: Deploy directly from GitHub (Recommended)

1. Push your code to GitHub
2. Log in to your Vercel account
3. Click "Add New" > "Project"
4. Select your GitHub repository
5. Configure the project:
   - Framework Preset: Select "Other"
   - Root Directory: `./website`
   - Build Command: `npm install`
   - Output Directory: Leave empty
   - Install Command: `npm install`
   - Development Command: `npm start`
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Navigate to your website directory in the terminal:
   ```
   cd website
   ```

2. Run the Vercel deployment command:
   ```
   vercel
   ```

3. Follow the prompts to configure your deployment:
   - Set up and deploy: Yes
   - Link to existing project: No
   - Project name: eleven-website (or your preferred name)
   - Root directory: ./ (since you're already in the website directory)
   - Override settings: No

4. After deployment, Vercel will provide a URL to access your website

## Important Notes

1. The `vercel.json` file in the website directory is already configured for proper routing.

2. Vercel automatically detects changes to your repository and deploys updates.

3. Separating the website from the bot is a good practice because:
   - The website is a static/simple Express application best suited for Vercel
   - The Discord bot is a long-running process better suited for platforms like Render or Railway

## Custom Domains

To add a custom domain to your Vercel deployment:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" > "Domains"
3. Add your domain and follow the DNS configuration instructions

## Accessing Your Deployment Guide

The deployment guide for the Discord bot on Render is still accessible in the repository.
To access it from your website, modify the link in your HTML from `/RENDER_DEPLOYMENT_GUIDE.md` to 
`https://github.com/YOUR_USERNAME/YOUR_REPO/blob/main/RENDER_DEPLOYMENT_GUIDE.md` or simply create
a copy in your website folder.