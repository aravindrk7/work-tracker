const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    earning: Number,
    status: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('works', workSchema);