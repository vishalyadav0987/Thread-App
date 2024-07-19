const express = require('express');
const app = express();
const connectDB = require('./connectDB/connect');
require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/test', (req, res) => {
    res.send("This test route for testing purpose.");
});


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Something went wrong, Please check the Database");
    }
}

start();
