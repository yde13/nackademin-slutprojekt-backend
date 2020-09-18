const express = require('express')
const app = express()
const cors = require('cors')

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

/**
 * Route link
 */



module.exports = app