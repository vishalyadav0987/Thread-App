const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB/connect');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
// const PORT = process.env.PORT || 5000;
const PORT = 3000 || 5000;
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const messageRoutes = require('./routes/messageRoutes')
const {app,server} = require('./socket/socket');
const path = require('path')

app.use(express.json({ limit: "50mb" }));// parse payload data
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
app.use('/api/v1/message', messageRoutes)

app.get('/test', (req, res) => {
    res.send("This test route for testing purpose.");
});

if(process.env.NODE_ENV="production"){
    // app.use(express.static(path.join(__dirname,"frontend/build")))

    const frontendPath = path.join(__dirname, '..', 'frontend', 'build');
    app.use(express.static(frontendPath));


    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(frontendPath,"frontend","build","index.html"))
    })
}


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Something went wrong, Please check the Database");
    }
}

start();
