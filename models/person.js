const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 1. Define "person" SCHEMA (collection)
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

// 3. "pre" : Middleware function to encrypt password before storing
personSchema.pre('save',async function(next){
    const person = this;
    if (!person.isModified('password')) return next(); // Skip hashing if password hasn't changed

    try{
        // 3.1 Salting 
        const salt = await bcrypt.genSalt(10);

        // 3.2 Hashing
        const hashedPassword = await bcrypt.hash(person.password,salt);

        // 3.3 Final replacement
        person.password = hashedPassword;

        next();
    }
    catch(err){
        return next(err);
    }
})

// 4. Compare passwords
personSchema.methods.comparePassword = async function(candidatePass){
    try{
        const isMatch = await bcrypt.compare(candidatePass,this.password)
        return isMatch;
    }
    catch(err){
        throw err;
    }
}


// 2. Create "person" MODEL
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
