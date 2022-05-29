const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subscribes: {
        type: Boolean,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("UserModel", schema);