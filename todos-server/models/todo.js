var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('todo', todoSchema);
