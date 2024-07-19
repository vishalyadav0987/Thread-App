const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/test', (req, res) => {
    res.send("This test route for testing purpose.");
});


app.listen(PORT, () => {
    console.log(`Server runnning at http://localhost:${PORT}`)
});
