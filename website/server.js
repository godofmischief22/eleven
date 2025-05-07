const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the website directory
app.use(express.static(path.join(__dirname)));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the deployment guide as HTML 
app.get('/RENDER_DEPLOYMENT_GUIDE.md', (req, res) => {
    try {
        const mdPath = path.join(__dirname, 'RENDER_DEPLOYMENT_GUIDE.md');
        const mdContent = fs.readFileSync(mdPath, 'utf8');
        
        // Simple markdown to HTML conversion for headers and code blocks
        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>ELEVEN Bot Deployment Guide</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 900px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1, h2, h3 { color: #6d2eb5; }
                    code, pre {
                        font-family: monospace;
                        background-color: #f4f4f4;
                        border-radius: 3px;
                        padding: 2px 5px;
                    }
                    pre {
                        padding: 15px;
                        overflow-x: auto;
                    }
                    a { color: #ff4ecd; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    hr { border: 1px solid #eee; }
                </style>
            </head>
            <body>
                ${mdContent
                    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/^\`\`\`(.*)\n([\s\S]*?)\n\`\`\`$/gm, '<pre><code>$2</code></pre>')
                    .replace(/\`([^\`]+)\`/g, '<code>$1</code>')
                    .replace(/\n/g, '<br>')}
            </body>
            </html>
        `;
        
        res.send(htmlContent);
    } catch (err) {
        console.error('Error serving deployment guide:', err);
        res.status(404).send('Deployment guide not found');
    }
});

// Health check route for Render
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Serve the root directory files for configuration access
app.use('/config', express.static(path.join(__dirname, '..')));

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`ELEVEN Website running on port ${PORT}`);
});