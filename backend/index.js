const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./connectDB/connect');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')


app.use(cors());
app.use(express.json());// parse payload data
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser())

// Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/post', postRoutes)

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
