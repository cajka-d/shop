const { Schema, model } = require('mongoose');

const userSchema = new Schema({
        login: {
        type: String,
        unique: true, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true, 
        required: true,
    },
})

const User = model('User', userSchema);

module.exports = User;