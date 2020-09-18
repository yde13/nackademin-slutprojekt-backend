const express = require('express')
const app = express()
const cors = require('cors')

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

/**
 * Route link
 */


app.use('/api/auth', loginRoute)
app.use('/api/register', userRoute)

module.exports = app