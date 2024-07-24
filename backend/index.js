const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./connectDB/connect');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
// const PORT = process.env.PORT || 5000;
const PORT = 3000 || 5000;
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')


app.use(express.json());// parse payload data
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3001', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

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
