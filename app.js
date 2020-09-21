const express = require('express')
const app = express()
const cors = require('cors')

const productsRoute = require('./routes/productsRoute')
/**
 * Länka in routes här
 */

const loginRoute = require('./routes/authentication')
const userRoute = require('./routes/user')
 /**
 * Middleware
 */

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public') )
app.use(cors())


app.use('/api', productsRoute)
/**
 * Route link
 */


app.use('/api/auth', loginRoute)
app.use('/api/register', userRoute)

module.exports = app