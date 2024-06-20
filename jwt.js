const jwt = require('jsonwebtoken');

//      FUNCTION 1 : Verify Token
const jwtAuthMiddleware = (req, res, next) => {

    // 1. Extract JWT token from request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({
        error: 'Unauthorized'
    })

    try{
        // Verify the JWT token
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = payload;
        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({
            error: 'Invalid token'
        });
    }
}

// FUNCTION 2 : Create Token
const generateToken = (userData) =>{
    // Generate JWT Token using user data
    return jwt.sign(userData,process.env.JWT_SECRET);
}


module.exports = {jwtAuthMiddleware,generateToken};