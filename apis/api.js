var logincntrl = require('./controllers/login');
var todocntrl = require('./controllers/todo');
var jwt = require('json-web-token');
var jwt1 = require('jsonwebtoken');
var config = require('../config');

module.exports = function(express, app){

var router = express.Router();

function gettoken(payload){
    return jwt1.sign(payload , config.SecretMessage);
}

function verifytoken(token){
try{
    jwt1.verify(token, config.SecretMessage);
    return true;
}
catch(err){ 
    console.log('catch :' + err);
    return false;
}
};

// app.use('/todo/*',function(req, res, next){

// var token = req.headers['x-access-token'] || req.body.token;
// // console.log(token);

// if(token){
// if(verifytoken(token)){
// res.setHeader('x-access-token', token);
// next()
// }
// else{
//     res.redirect('login');
//     // res.status(403).send({Message : 'Opps! Token didn\'t match! Try Logging in Again!', Token : gettoken({name : 'yash'})});
// }
// }
// else{
//     // res.send('redirecting');
//     // console.log('path :' +req.path);
//         res.redirect('/login');
// }
// });

router.get('/login',function(req, res){
    // console.log(req.headers);

res.setHeader('x-access-token', 'Token Again!');
res.sendFile(process.cwd() + '/Views/Login.html');
});

router.post('/signup',function(req, res){
    var x = logincntrl.signup(req.body.name, req.body.email, req.body.password);
    console.log(x);
    res.send(x);
}); 

router.post('/login', function(req, res){
console.log(req.body);
});


//Todo App controllers


router.get('/todo',function(req, res){

    res.sendFile(process.cwd() + '/Views/todo.html');

});

router.get('/todo/all',function(req, res){

    todocntrl.getall(function(item){
        console.log('items : ' + item);
        res.json(item);
    });
    // console.log('x : ' + x);
    // res.json(x);
}); 

router.post('/todo/add',function(req, res){

    console.log( req.body);

    res.json({status : todocntrl.add(req.body.newitem)});

});


router.post('/todo/remove',function(req, res){

    console.log('id:'+req.body.id);

    todocntrl.remove(req.body.id , function(re){
        console.log('response : '+ re);
    res.json({status : re});
        
    });

});

////Testing

return router;

};