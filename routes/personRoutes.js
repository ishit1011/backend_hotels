// ----------------------- Express ROUTER ----------------------------
//  1. Define Person Routes
const express = require('express');
const router = express.Router();

//  2. Reference to Schemas (Collections) ==> Person, Menu
const Person = require('../models/person');

const {jwtAuthMiddleware,generateToken} = require('../jwt');

// --------------------------  End Points -------------------------------

//  3. POST : Post data of person in the database(MongoDB)  --->   CREATE
router.post('/signup',async(req,res)=>{
    try{
        // 1. Get data from client
        const data = req.body;
 
        // 2. Create new person using Mongoose Schema/Model
        const newPerson = new Person(data);

        // 3. Save person to database
        const response = await newPerson.save();
        console.log('Data saved successfully');


        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generateToken(payload);

        res.status(200).json({
            response: response,
            token: token
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }

})

// 4. GET : Get the data of person from the database(MongoDB) ---> READ
router.get('/',async (req,res) => {
    try{
        const data = await Person.find();
        console.log('Data Fetched Successfully');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})

// 5. Parameterised API calls
router.get('/:workType',async (req,res) => {
    try{
        const workTypeData = req.params.workType;
        if(workTypeData == 'Chef' || workTypeData == 'Waiter' || workTypeData == 'Manager'){
            const responseWorkType = await Person.find({work : workTypeData});
            console.log('Response Fetched');
            res.status(200).json(responseWorkType);
        }
        else{
            res.status(404).json({
                error: 'Invalid Profession'
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})


// 6. PUT
router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; // Extract ID from URL
        const updatedPersonData = req.body; // Extract person JSON data

        const dbResponse = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, // Return updated document
            runValidators: true // Mongoose Schema validations
        })

        if(!dbResponse){
            return res.status(404).json({
                error: 'Person Not Found'
            })
        }

        console.log('Data Updated');
        res.status(200).json(dbResponse);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})


//  7. DELETE
router.delete('/:id', async(req,res)=>{
    try{
        const userId = req.params.id;
        
        const dbResponse = await Person.findByIdAndDelete(userId);

        if(!dbResponse){
            return res.status(404).json({
                error: 'Person Not Found'
            })
        }

        console.log('Data Deleted');
        res.status(200).json({
            message: 'Data deleted successfully'
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})


module.exports = router;