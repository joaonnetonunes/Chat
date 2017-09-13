var mongoose = require('mongoose');

var conversations = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
    },
    enable: {
        type: Boolean,
        required: true,
        default: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model('Conversations', conversations);
