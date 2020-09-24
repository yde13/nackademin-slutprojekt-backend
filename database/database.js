require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoDatabase

switch (process.env.ENVIRONMENT) {
    case 'development':
        mongoDatabase = new MongoMemoryServer();

        connect()
        break;
    case 'test':

        mongoDatabase = new MongoMemoryServer();
        break;
    case 'production':
        mongoDatabase = {
            getUri: async () =>
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        connect()
        break;
    case 'staging':
        mongoDatabase = {
            getUri: async () =>
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        connect()
        break;
}

async function connect() {

    let uri = await mongoDatabase.getUri()
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect() {

    await mongoose.connection.close()
    if (process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development') {
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

const Order = mongoose.model("orders", OrderSchema)

const ProductsSchema = new mongoose.Schema({
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
    },
    serial: {
        type: String
    }
})

const Products = mongoose.model("Products", ProductsSchema)

module.exports = {
    connect, disconnect, User, Products, Order
}