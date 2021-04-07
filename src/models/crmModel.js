const { Int32 } = require('bson');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName : {
        type: String, 
        required: true,
    }, 

    lastName: {
        type: String, 
        required: true,
    },

    email: {
        type: String
    }, 

    company: {
        type: String
    },

    phone: {
        type: Number
    },

    created_date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = ContactSchema