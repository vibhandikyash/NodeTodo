var user = require('../models/usermodel');

module.exports.signup = function(name, email, password){

var User = new user({
    Name : name,
    Email : email,
    Password : password,
    IsActive : 0
});


return Boolean (
 User.save(function(err){
 (err) ?  false :  true
}));

// return x;
//
};

// module.exports.login = function(user, pass){

// user.findOne({ Email : user , Password : pass}, )


// };