# Deploying ELEVEN Bot and Website to Render

This guide explains how to deploy your Discord Music Bot and Website to Render.com.

## Prerequisites

1. Create a [Render](https://render.com) account if you don't have one
2. Connect your GitHub repository to Render
3. Have your Discord Bot token ready
4. Access to a working Lavalink server (see Lavalink section below)

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

## Lavalink Server Setup (Important!)

ELEVEN bot requires a Lavalink server to stream music. You have several options:

### Option 1: Hosted Lavalink Server (Easiest)

Update the `Config.js` file to use a reliable public Lavalink server:

```javascript
Nodes: [
    {
        name: "Main",
        url: "lavalink.devamop.in", // Or another reliable server
        port: 443,
        auth: "DevamOP",
        secure: true,
    }
],
```

### Option 2: Host Your Own Lavalink Server on Render

1. Create a new Web Service on Render
2. Use this GitHub repository: `https://github.com/freyacodes/Lavalink`
3. Set the following:
   - **Environment**: Docker
   - **Build Command**: Leave empty
   - **Start Command**: Leave empty
4. Add environment variable:
   - `PORT`: 80
5. Deploy the service
6. Update your `Config.js` to use your own Lavalink server:

```javascript
Nodes: [
    {
        name: "Main",
        url: "your-lavalink-service.onrender.com",
        port: 80,
        auth: "youshallnotpass", // Default password, change in application.yml
        secure: false,
    }
],
```

### Option 3: Self-Hosted Lavalink Server (Advanced)

Host a Lavalink server on your own infrastructure and configure the bot to connect to it.

## Important Notes

1. For the Discord bot to work properly:
   - Make sure your Discord bot has proper intents enabled in the Discord Developer Portal
   - The Lavalink server configuration must be accessible from the internet
   - For voice functionality, enable "Voice" and "Message Content" intents
   
2. The free plan of Render has some limitations:
   - Services will spin down after 15 minutes of inactivity
   - Limited bandwidth and compute hours

3. You can upgrade your plan for better performance if needed

## Troubleshooting

If you encounter issues with the bot connecting to voice channels:
- Check if the Lavalink server is accessible by trying to connect directly with a browser
- Verify your Discord bot has proper voice permissions
- Make sure the bot token is correct
- See if your Lavalink server requires secure connection (wss://) or not

For website issues:
- Check the Render logs for any errors
- Verify that all static assets are loading correctly

## Lavalink Connection Issues

When deploying on Render, common Lavalink issues include:

1. **Connection Timeouts**: Verify your Lavalink server is accessible from Render (public)
2. **Authentication Errors**: Double-check the auth token in your Config.js
3. **Port/Protocol Mismatch**: Make sure you're using the correct port and secure setting

## Accessing Your Services

Once deployed:
- Your website will be accessible at: `https://eleven-website.onrender.com`
- Your Discord bot will be running as a background service

Remember to invite your bot to your Discord server using the OAuth2 URL provided in the Discord Developer Portal.