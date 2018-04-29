//server/server.js
//Here, we create a server, set the ‘view engine’ to ‘ejs’ as we discussed earlier.
//We also tell our server where our template file(s) are placed.All our front - end
//code will reside inside the client folder as already discussed.

var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
mongoose.connect('mongodb://block_user:blockquizpass@ds255319.mlab.com:55319/aurimas_sk');
app.use('/', router);
app.listen(8080, function () {
    console.log('Express server is up and running!');
});
module.exports = app;