# Deploying ELEVEN Bot and Website to Render

This guide explains how to deploy your Discord Music Bot and Website to Render.com.

## Prerequisites

1. Create a [Render](https://render.com) account if you don't have one
2. Connect your GitHub repository to Render
3. Have your Discord Bot token ready

## Deployment Options

You have two options for deployment:

### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub with the included `render.yaml` file
2. In your Render dashboard, go to "Blueprints"
3. Click "New Blueprint Instance"
4. Connect your GitHub repo
5. Render will automatically detect the `render.yaml` file and set up your services
6. Add the required environment variables:
   - `DISCORD_TOKEN`: Your Discord bot token
   - `CLIENT_ID`: Your Discord application client ID
   - `CLIENT_SECRET`: Your Discord application client secret (optional)

### Option 2: Manual Setup

#### Discord Bot Deployment:

1. In Render dashboard, click "New" > "Web Service"
2. Connect your GitHub repo
3. Configure the service:
   - **Name**: eleven-discord-bot
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: node Shard.js
4. Add the required environment variables:
   - `DISCORD_TOKEN`: Your Discord bot token
   - `CLIENT_ID`: Your Discord application client ID
   - `CLIENT_SECRET`: Your Discord application client secret (optional)
5. Click "Create Web Service"

#### Website Deployment:

1. In Render dashboard, click "New" > "Web Service"
2. Connect your GitHub repo
3. Configure the service:
   - **Name**: eleven-website
   - **Environment**: Node
   - **Build Command**: cd website && npm install
   - **Start Command**: cd website && npm start
   - **Environment Variable**: PORT=10000
4. Click "Create Web Service"

## Important Notes

1. For the Discord bot to work properly:
   - Make sure your Discord bot has proper intents enabled in the Discord Developer Portal
   - The Lavalink server configuration must be accessible from the internet
   
2. The free plan of Render has some limitations:
   - Services will spin down after 15 minutes of inactivity
   - Limited bandwidth and compute hours

3. You can upgrade your plan for better performance if needed

## Troubleshooting

If you encounter issues with the bot connecting to voice channels:
- Check if the Lavalink server is accessible
- Verify your Discord bot has proper voice permissions
- Make sure the bot token is correct

For website issues:
- Check the Render logs for any errors
- Verify that all static assets are loading correctly

## Accessing Your Services

Once deployed:
- Your website will be accessible at: `https://eleven-website.onrender.com`
- Your Discord bot will be running as a background service

Remember to invite your bot to your Discord server using the OAuth2 URL provided in the Discord Developer Portal.