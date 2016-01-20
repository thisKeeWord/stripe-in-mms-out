var express = require('express');
var app = express();
var sk = require('./../config.js').secretKey;
var stripe = require("stripe")(sk);
var bodyParser = require('body-parser')
var fs = require('fs');
var path = require('path');
var Texting = require('./twilioController.js');

app.listen(8080, function(){
  console.log('Server is lisening on port 8080')
})

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser.urlencoded());
app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, './../client/index.html'));
});

app.post("/stripe", function(request, response) {
  var phone = request.body.phone
  console.log('phone: ', phone)
  var stripeToken = request.body.stripeToken;
  var charge = stripe.charges.create({
    amount: 100,
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log('error yo');
    }
      console.log('success');
    response.sendFile(path.join(__dirname, './../client/success.html'));
    // fs.writeFile('stripeResponse.json', JSON.stringify(charge));
  });
});
