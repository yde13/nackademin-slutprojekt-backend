require('dotenv').config();
const userModel = require('./userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

async function createToken (payload) {
    return jwt.sign(payload, secret, {expiresIn : '1h'})
}

module.exports = {
    login: async (loginObject) => {
        
        const user = await userModel.getUser({email: loginObject.email})

        if(user) {
            // If we get a match on the username -> check hashed pw
            const checkedPassword = bcrypt.compareSync(loginObject.password, user.password)

            // If we get a match on the password -> return a token to the client
            if(checkedPassword) {
                let token = await createToken({userId: user._id, role: user.role, name: user.name, email: user.email})
                return {
                    token: token, 
                    user: {
                        email: user.email,
                        name: user.name, 
                        role: user.role, 
                        adress: user.adress
                }}
            } else {
                return {msg: 'Wrong password'}
            }
        } else {
            return {msg: 'Wrong email'}
        }
    },
    verifyToken: async (token) => {
        const payload = jwt.verify(token, process.env.SECRET)
        return { 
            ...payload,
            isAdmin(){
                return this.role === 'admin'
            },
            isCustomer() {
                return this.role === 'customer'
            },
            isVisitor() {
                return this.role === 'visitor'
            }
        }
    }
}