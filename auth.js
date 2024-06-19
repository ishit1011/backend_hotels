/*  Passport Middleware [for AUTHENTICATION]
        - Passport-local : Strategy for username & password based strategy
*/
// 1. Passport Initializations
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

// 2. Configuring Passport : Local-strategy
passport.use(new LocalStrategy(async(USERNAME,PASSWORD,done) => {
    // authentication logic here
    try{
        const user = await Person.findOne({USERNAME})

        if(!user){
            return done(null, false, { message : 'Incorrect username.'});
        }
        else{
            const isPasswordMatch = await user.comparePassword(PASSWORD);
            if(isPasswordMatch){
                return done(null,user);
            }
            else{
                return done(null, false, { message : 'Incorrect Password'});
            }
        }

    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport;
