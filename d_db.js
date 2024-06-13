const mongoose = require('mongoose');


// 1. Define the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels" // "hotels : Name of database to be created in mongoDB"

// 2. Setup MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 3. Get default connection :
//    Mongoose maintains default connection representing MongoDB connection
const db = mongoose.connection;

// 4. Event Listeners for database connections
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('Error in connection : ',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

// 5. Export the database connection to the Node.js Application
module.exports = db;