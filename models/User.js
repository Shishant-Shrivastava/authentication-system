const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        in: ['admin', 'friend'],
        default: 'friend'
    }
})

const User = mongoose.model('users', UserSchema)
module.exports = User;