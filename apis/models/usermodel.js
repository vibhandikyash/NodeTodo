var mongoose = require('mongoose');

var userSchem = mongoose.Schema;

var user = new userSchem({
    Name : String,
    Email : { type : String, required : true},
    Password : { type : String, required : true},
    IsActive : 0
});

module.exports = mongoose.model('User', user);

