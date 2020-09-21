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
        console.log('inne i test');
        const {MongoMemoryServer} = require('mongodb-memory-server')
        mongoDatabase = new MongoMemoryServer({ binary: { version: '4.4.1' } } )
;
        connect()
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
    console.log('disconnecting');
    if(process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development'){
        console.log('test iz stop');
        await mongoDatabase.stop()
    }
    await mongoose.connection.close()
}

var UserSchema = new mongoose.Schema({
    name: {
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

var OrderSchema = new mongoose.Schema({
    timeStamp: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    items: {
        type: Array
    },
    orderValue: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("users", UserSchema)
const Order = mongoose.model("orders", OrderSchema)

module.exports = {
    connect, disconnect, User, Order
}
// mongodb+srv://madmonkey:<password>@cluster0.txazb.mongodb.net/<dbname>?retryWrites=true&w=majority