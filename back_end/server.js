const express = require('express');
const cors = require('cors');
const app = express();
const cardData = require('./cardData');

app.use(express.json());
app.use(cors());

app.get('/api/cardData', (req, res) => {
    res.json({
        message: "Here is the card to display on the site",
        data: cardData
    });
});

app.get('/api/cardData', (req, res) => {
    res.json({
        message: "Here is the card to display on the site",
        data: cardData
    });
});


const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, () => {
    console.log(`Backend running on http://${hostname}:${port}`);
});
