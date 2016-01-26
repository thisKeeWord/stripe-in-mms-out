var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var payment = require('./stripeController');
var Texting = require('./twilioController.js');
var compression = require('compression');

//import self signed ssl certs
var privateKey = fs.readFileSync('sslcerts/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcerts/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var https = require('https').Server(credentials, app);

//add compression and filter out stuff that shouldnt be compressed
app.use(compression({filter: shouldCompress}));
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, './../')));


function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, './../client/index.html'));
});

app.post("/stripe", payment.createCharge, Texting.sendingText);

app.listen(process.env.PORT || 8080, function(){
  console.log('Server is lisening on port 8080');
})
https.listen(8081, function(){
    console.log('Server is listening on port 8081');
})
