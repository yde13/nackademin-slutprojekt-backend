require('dotenv').config();
const { verifyToken } = require('../models/authenticationModel')
const jwt = require('jsonwebtoken')

module.exports = {
    authorization: async (req,res,next) => {
        if(!req.headers.authorization) return res.status(403).json({msg:"failed the auth"})
        const token = req.headers.authorization.replace("Bearer ", "")
        try{
            // console.log('inne i auth')
            req.user = await verifyToken(token)

            //console.log(req.user)
            next()
        }catch(error){
            if(error instanceof jwt.TokenExpiredError){
                console.log('not logged in jwt' )
                res.status(403).json({msg: "You are not logged in"})
            } else {
                // console.log('not logged in wat')
                res.status(403).json({error: error})
            }
        }
    }
}
