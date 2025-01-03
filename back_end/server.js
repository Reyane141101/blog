const express = require('express');
const cors = require('cors');
const app = express();
const cardData = require('./cardData');
const subjects = require('./subjects');

app.use(express.json());
app.use(cors());

app.get('/api/cardData', (req, res) => {
        res.json({
        message: "Here is the card to display on the site",
        data: cardData
    });
});

app.get('/api/Subjects', (req, res) => {
    res.json({
        message: "Here is the card to display on the site",
        data: subjects
    });
});


const hostname = "localhost";
const port = 3001;

app.listen(port, () => {
    console.log(`Backend running on http://${hostname}:${port}`);
});
