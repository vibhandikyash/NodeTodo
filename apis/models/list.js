var mongoose = require('mongoose');

list = mongoose.Schema;

var listschema = new list({
    list : String
});


module.exports = mongoose.model('todolist',listschema);