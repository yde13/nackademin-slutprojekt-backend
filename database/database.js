require('dotenv').config();
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server')

let mongoDatabase

console.log(process.env.ENVIRONMENT);
async function testConnect() {
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
                console.log('inne i testanslutningen');
                mongoDatabase = new MongoMemoryServer({ binary: { version: '4.4.1' } } );
                let uri = await mongoDatabase.getUri()
                console.log('connecting');
                await mongoose.connect(uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                })

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
}
console.log('nu callas testconnect');
testConnect()
async function connect(){
    let uri = await mongoDatabase.getUri()
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect(){
    console.log('nu säger vi hejdå');
    console.log('disconnecting');
    await mongoose.connection.close()
    if(process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development'){
        console.log('test iz stop');
        await mongoDatabase.stop()
    }
    
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

const User = mongoose.model("users", UserSchema)

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