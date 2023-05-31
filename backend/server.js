const app = require('./app.js');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database.js')
const cloudinary = require('cloudinary');

//Handling uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to  uncaught Exception`);
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"})

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on https://localhost:${process.env.PORT}`)
});

//unhandled Promise Rejection
process.on('unhandledRejection',err => {
    console.log(`Error ${err.message}`);
    console.log('Shutting down the server due to unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    })
})