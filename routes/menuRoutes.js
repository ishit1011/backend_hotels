const express = require('express');
const router = express.Router();

//  2. Reference to Schemas (Collections) ==> Person, Menu
const MenuItem = require('../models/menu');


// --------------------------  End Points -------------------------------

// POST
router.post('/', async(req,res) =>{
    try{
        const data = req.body;

        const newMenuItem = new MenuItem(data);

        const menuResponse = await newMenuItem.save();
        console.log('Menu Data save successfully');
        res.status(200).json(menuResponse);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})



// GET
router.get('/',async (req,res) => {
    try{
        const menuData = await MenuItem.find();
        console.log('Data Fetched Successfully');
        res.status(200).json(menuData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})

// PARAMETERISED Call
router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'Spicy' || tasteType ==  'Sweet' || tasteType ==  'Sour'){
            const dbResponse = await MenuItem.find({
                taste : tasteType
            })
            console.log('Data Fetched');
            res.status(200).json(dbResponse);
        }
        else{
            res.status(404).json({
                error: 'Invalid Taste Choice'
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

// Recent change test 
module.exports = router;