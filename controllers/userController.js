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
            let addedUser = await userModel.addUser(user)
            const loginObject = {
                email: req.body.email,
                password: req.body.password
            }
            const response = await authenticationModel.login(loginObject)
            let status = addedUser ? 201 : 400
            let msg = addedUser ? 'New account created' : 'That username already exists'
            res.status(status).json(response)
        }

        else {
            res.status(401).json({msg: 'Cannot add a admin'})
        }
       
    }
}