var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var payment = require('./stripeController');
var Texting = require('./twilioController.js');

//import self signed ssl certs
var privateKey = fs.readFileSync('sslcerts/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcerts/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var https = require('https').Server(credentials, app);


app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, './../')));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, './../client/index.html'));
});

app.post("/stripe", payment.createCharge, Texting.sendingText);

app.listen(8080, function(){
  console.log('Server is lisening on port 8080');
})
https.listen(8081, function(){
    console.log('Server is listening on port 8081');
})
