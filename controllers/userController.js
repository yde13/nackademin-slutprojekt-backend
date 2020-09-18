const userModel = require('../models/userModel');

module.exports = {
    addUser: async (req, res) => {
        console.log('i user cont');
        const user = {
            name: req.body.name,
            password: req.body.password,
            role: "customer",
            email: req.body.email,
            adress: req.body.adress
        }
        if(user.role != 'admin') {
            let addedId = await userModel.addUser(user)
            let status = addedId ? 201 : 400
            let msg = addedId ? 'New account created' : 'That username already exists'
            res.status(status).json({msg})
        }
        else {
            res.status(401).json({msg: 'Cannot add a admin'})
        }
       
    }
}