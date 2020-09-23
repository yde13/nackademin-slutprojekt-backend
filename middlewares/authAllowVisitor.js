require('dotenv').config();
const { verifyToken } = require('../models/authenticationModel')
const jwt = require('jsonwebtoken')

module.exports = {
    authAllowVisitor: async (req,res,next) => {
        
        if(!req.headers.authorization) {
            console.log('this is a visitor, let him do the order!');
            next()
        } else {
            const token = req.headers.authorization.replace("Bearer ", "")
            try{
                req.user = await verifyToken(token)

                next()
            }catch(error){
                if(error instanceof jwt.TokenExpiredError){
                    console.log('not logged in jwt' )
                    res.status(403).json({message: "You are not logged in"})
                } else {
                    res.status(403).json({error: error})
                }
            }
        }
        
    }
}
