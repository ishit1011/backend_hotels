/* Express JS : 1. Framework of Node.js ---> Used to create server for the backend functionality
                2. Building Web Apps & APIs using Node.js
                3. Foundation for handling incoming requests & defining how WebApp responds to them
    ------------------------- Express SERVER --------------------
*/
const express = require('express');
const app = express();
const db = require('./d_db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const passport = require('./auth');
app.use(passport.initialize());

// 1. Fetches HTTP request from client & convert it's body into JSON format
const bodyParser = require('body-parser');
app.use(bodyParser.json());// saves data in HTTP request's body --> "req.body"

/* 4. Middleware Function [Example]
// 4.1 Definition
const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
// 4.2 Configure middleware 
app.use(logRequest);
*/


app.get('/',(req,res)=>{
    res.send("Welcome to my HOTEL");
})


//  2. Express ROUTING ==> Person, Menu
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')


//  3. Use ROUTES ==> Person, Menu

// Local middleware : 
const localMiddleware = passport.authenticate('local',{session: false});
app.use('/person',localMiddleware,personRoutes); 
app.use('/menu',menuRoutes);

app.listen(PORT,()=>{
    console.log("listening to port 3000")  
}) 