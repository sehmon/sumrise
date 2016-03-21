var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    url: String,
    contents: String,
    date_added: Date,
    userId: String
});

module.exports = mongoose.model('Article', ArticleSchema);
