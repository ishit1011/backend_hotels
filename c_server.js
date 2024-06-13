/* Express JS : 1. Framework of Node.js ---> Used to create server for the backend functionality
                2. Building Web Apps & APIs using Node.js
                3. Foundation for handling incoming requests & defining how WebApp responds to them
    ------------------------- Express SERVER --------------------
*/
const express = require('express');
const app = express();

const db = require('./d_db');

// 1. Fetches HTTP request from client & convert it's body into JSON format
const bodyParser = require('body-parser');
app.use(bodyParser.json());// saves data in HTTP request's body --> "req.body"

//  2. Reference to Schemas (Collections) ==> Person, Menu
const MenuItem = require('./models/menu');

//  3. Express ROUTING ==> Person, Menu
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')


app.get('/',(req,res)=>{
    res.send("Welcome to my HOTEL");
})

//  4. Use ROUTES ==> Person, Menu
app.use('/person',personRoutes); 
app.use('/menu',menuRoutes);


app.listen(3000,()=>{
    console.log("listening to port 3000")  
}) 