const express = require('express')
const app = express()
const cors = require('cors')

const productsRoute = require('./routes/productsRoute')
const loginRoute = require('./routes/authentication')
const userRoute = require('./routes/user')
const orderRoute = require('./routes/order')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public') )
app.use(cors())

// Routes
app.use('/api/products', productsRoute)
app.use('/api/auth', loginRoute)
app.use('/api/register', userRoute)
app.use('/api/orders', orderRoute)

module.exports = app