require('dotenv').config();
const mongoose = require('mongoose');

let mongoDatabase

console.log(process.env.ENVIRONMENT);
switch(process.env.ENVIRONMENT){
    case 'development':
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () => 
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TEST}?retryWrites=true&w=majority`
        }
        connect()
        break;
    case 'test':
        const {MongoMemoryServer} = require('mongodb-memory-server')
        mongoDatabase = new MongoMemoryServer()
        break;
    case 'production':
    case 'staging':
        console.log('Inne i atlas conneciton');
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () => 
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        connect()
        break;
}

async function connect(){
    
    let uri = await mongoDatabase.getUri()
    console.log(uri);
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect(){
    if(process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development'){
        await mongoDatabase.stop()
    }
    await mongoose.disconnect()
}

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    adress: {
        street: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    orderHistory: {
        type: Array
    }
})

const User = mongoose.model("User", UserSchema)

const ProductsSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    longDesc: {
        type: String,
        required: true
    },
    imgFile: {
        type: String,
        required: true
    }
})

const Products = mongoose.model("Products", ProductsSchema)


module.exports = {
    connect, disconnect, User, Products
}
// mongodb+srv://madmonkey:<password>@cluster0.txazb.mongodb.net/<dbname>?retryWrites=true&w=majority