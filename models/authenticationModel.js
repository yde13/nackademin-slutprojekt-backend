require('dotenv').config();
const userModel = require('./userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function createToken (payload) {
    return jwt.sign(payload, secret, {expiresIn : '1h'})
}

module.exports = {
    login: async (loginObject) => {
        /**
         * Get user with username
         */
        //console.log('loggin in with username ' + loginObject.username + ' pw: ' + loginObject.password)
        const user = await userModel.getUser({username: loginObject.username})
        if(user) {
            // If we get a match on the username -> check hashed pw
            const checkedPassword = bcrypt.compareSync(loginObject.password, user.password)
            // If we get a match on the password -> return a token to the client
            if(checkedPassword) {
                // console.log('login sucessed, signing token')
                let token = createToken({userId: user._id, role: user.role, username: user.username})
                return loginSucess = {token: token, username: user.username, role: user.role, id: user._id.toString()}
            } else {
                return {msg: 'wrong password'}
            }
        } else {
            return {msg: 'wrong username'}
        }
    }
}