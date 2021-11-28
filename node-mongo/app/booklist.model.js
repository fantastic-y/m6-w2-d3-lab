const mongoose = require('mongoose');

const BooklistSchema = new mongoose.Schema({
    title: String,
    author: String
});

module.exports = mongoose.model('Booklist', BooklistSchema);