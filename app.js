var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var api = require('./apis/api');
var morgan = require('morgan');


var app = express();
mongoose.connect(config.database,function(err){
err ? console.log(err) : console.log('database connected');
}); //Database Enabled Temporarily!


app.use('/angular', express.static('angular'));
app.use('/TemplateAssets', express.static('TemplateAssets'));
app.use('/LoginAssets', express.static('LoginAssets'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use(app.get('/', function(req, res, next){
// console.log('Sshhh!! Someone Came!');
// next()
// }));
// app.use(verifyentry());


var i = 0;

if(i === 0)
{
app.use(api(express, app));
}
else
{
    console.log('Please Log in');
}





// app.post('/test1',function(req, res){
// console.log(req.body);
// });


app.listen(config.port);
console.log('Listening on port : ' + config.port);