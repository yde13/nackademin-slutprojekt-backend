require('dotenv').config();
const authenticationModel = require('../models/authenticationModel')
const secret = process.env.SECRET

module.exports = {
    login: async (req, res) => {
        console.log(req.body.adress);
        const loginObject = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: 'member',
            adress: req.body.adress
        }
        const response = await authenticationModel.login(loginObject)
        if(response) {
            // console.log(response)
            res.status(200).json({response})
        } else {
            res.status(401).json({msg: response.msg})
        }
  
    },
    checkToken: async(req, res) => {
        // console.log(req.user.username)
        const response = {
            isLoggedIn : true,
            userid: req.user.userId,
            role: req.user.role,
            username: req.user.username,
            test: 'test'
        }
        res.status(200).json(response)
    }
}