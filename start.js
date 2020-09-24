require('dotenv').config();

const app = require('./app')

if(process.env.ENVIRONMENT == 'development') {
    const {applyData} = require('./dev/addDevData')
    applyData()
}

app.listen(process.env.PORT || 5000, () => 
    console.log("It's running birch! on port " + process.env.PORT || 5000))