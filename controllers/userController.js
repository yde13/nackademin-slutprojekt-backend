const userModel = require('../models/userModel');
const authenticationModel = require('../models/authenticationModel')
module.exports = {
    addUser: async (req, res) => {
        if(req.body.password != req.body.repeatPassword)
            return res.status(400).json({errormsg: 'Password does not match'})
        
        const user = {
            name: req.body.name,
            password: req.body.password,
            role: req.body.role || "customer",
            email: req.body.email,
            adress: req.body.adress
        }
        if(user.role != 'admin' && req.body.password && req.body.email) {
            
            const loginObject = {
                email: user.email,
                password: user.password
            }

            let addedUser = await userModel.addUser(user)
            if(!addedUser) return res.status(400).json({message: 'Email already exists'})

            const response = await authenticationModel.login(loginObject)

            if(response.token) { 
                res.status(201).json(response)
            } else {
                res.status(401).json(response.msg)
            }
            
        } else {
            res.status(400).json({errormsg: 'Incorect register format'})
        }
    } 
}