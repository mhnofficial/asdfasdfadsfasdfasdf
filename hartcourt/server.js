// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Route for proxying any site
app.use('/proxy', (req, res, next) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.send('Add ?url=https://example.com');

    createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: { '^/proxy': '' },
    })(req, res, next);
});

app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});
