const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
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
    }
});

user.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', user);