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
        /**
         * Get user with email id: user._id.toString()
         */ 
        // console.log('modellen och skickar vidare -->');
        // console.log(loginObject);
        const user = await userModel.getUser({email: loginObject.email})
        // console.log(user);
        //console.log(user);
        if(user) {
            // If we get a match on the username -> check hashed pw
            const checkedPassword = bcrypt.compareSync(loginObject.password, user.password)
            // If we get a match on the password -> return a token to the client
            if(checkedPassword) {
                // console.log('login sucessed, signing token')
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
                return {msg: 'wrong password'}
            }
        } else {
            return {msg: 'wrong email'}
        }
    },
    verifyToken: async (token) => {
        const payload = jwt.verify(token, process.env.SECRET)
        return { 
            ...payload,
            owns(document) {
                return document.userid === this.userId
            },
            isme(id) {
                return id === this.userId
            },
            isOwner(document){
                return document._id == this.userId
            },
            isAdmin(){
                return this.role === 'admin'
            },
            isCustomer() {
                return this.role === 'customer'
            },
            isVisistor() {
                return this.role === 'visitor'
            }
        }
   
    }
}