require('dotenv').config();

const app = require('./app')

app.listen(process.env.PORT || 5000, () => 
    console.log("It's running birch! on port " + process.env.PORT || 5000))