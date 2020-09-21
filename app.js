const express = require('express')
const app = express()
const cors = require('cors')

const productsRoute = require('./routes/productsRoute')
/**
 * Länka in routes här
 */



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



module.exports = app