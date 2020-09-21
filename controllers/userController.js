const userModel = require('../models/userModel');
const authenticationModel = require('../models/authenticationModel')
module.exports = {
    addUser: async (req, res) => {
        const user = {
            name: req.body.name,
            password: req.body.password,
            role: "customer",
            email: req.body.email,
            adress: req.body.adress
        }
        if(user.role != 'admin') {
            
            const loginObject = {
                email: user.email,
                password: user.password
            }

            let addedUser = await userModel.addUser(user)

            const response = await authenticationModel.login(loginObject)

            if(response.token) { 
                let status = addedUser ? 201 : 400
                let msg = addedUser ? 'New account created' : 'That username already exists'
                res.status(status).json(response)
            } else {
                res.status(401).json(response.msg)
            }

        }

        else {
            res.status(401).json({msg: 'Cannot add a admin'})
        }
       
    } 
}