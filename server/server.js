var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var payment = require('./stripeController');
var Texting = require('./twilioController.js');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './../')));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, './../index.html'));
});

app.post("/", payment.createCharge, Texting.sendingText);

app.listen(8080, function(){
  console.log('Server is lisening on port 8080');
})
