require('dotenv').config();
const authenticationModel = require('../models/authenticationModel')

module.exports = {
    login: async (req, res) => {
        const loginObject = {
            email: req.body.email,
            password: req.body.password
        }
        const response = await authenticationModel.login(loginObject)
        if(response.token) {
            res.status(200).json(response)
        } else {
            res.status(401).json(response.msg)
        }
    }
}