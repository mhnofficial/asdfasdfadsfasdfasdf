const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static(__dirname)); // serves index.html + style.css

// Proxy route
app.get("/proxy", async (req, res) => {
    const target = req.query.url;
    if (!target) return res.send("No URL provided.");

    try {
        const response = await fetch(target);
        const body = await response.text();
        res.send(body);
    } catch (err) {
        res.status(500).send("Error fetching site: " + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
