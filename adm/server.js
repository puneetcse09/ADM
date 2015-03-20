'use strict';

// Module dependencies.
var Utils=require('./lib/common/Utils/Utils.js');
var express = require('express');

var app = express();

// Express Configuration
require('./lib/config/express')(app);

// Controllers
var index = require('./lib/controllers');

// Server Routes

// Angular Routes
app.get('/partials/*', index.partials);
//compressing all js files to gzip before sending
app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

//app.get('/', function(req, res){
//    res.render('index');
//});

app.get('/',Utils.ensureRedirect, function(req,res){
    if( req.session.userDetails)
//        res.redirect('/index');
    	res.redirect('/index');
    else{
        res.render('index');
    }
});
app.get('/index',Utils.ensureRedirect, function(req,res){
    res.render('index');
});
require('./lib/homeSrchSmy/controllers/homeSrchSmyServer.js')(app,Utils);
//require('./lib/login/controllers/loginCtrl.js')(app,Utils);
//require('./lib/manageUsers/controllers/userProfileServer.js')(app,Utils);
require('./lib/manageUsers/controllers/manageUserServer.js')(app,Utils);
require('./lib/common/controllerUtil.js')(app,Utils);

process.on('uncaughtException', function (err) {
    console.error('uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)})
// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
//exports = module.exports = app;