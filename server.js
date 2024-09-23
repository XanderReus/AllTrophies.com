// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for the React app running on localhost:3000 (adjust if needed)
app.use(cors({ origin: 'http://localhost:3000' }));

// Proxy API requests to the external API
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://api.steampowered.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',  // remove /api prefix when forwarding requests
        },
    })
);

// Serve the React app (assuming it's built and static files are in 'build' folder)
app.use(express.static(path.join(__dirname, 'build')));

// Example route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'App.html'));
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
