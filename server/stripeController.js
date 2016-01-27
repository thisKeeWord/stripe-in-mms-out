var sk = process.env.secretKey || require('./../config.js').secretKey;
var stripe = require('stripe')(sk);
var path = require('path');

var payment = {};
payment.createCharge = createCharge;

function createCharge(req, res, next){
  console.log(req.body);
  var charge = stripe.charges.create({
    amount: 100,
    currency: "usd",
    source: req.body.dig,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log('error yo');
    }
      console.log('success');
    res.sendFile(path.join(__dirname, './../client/success.html'));
    next();
  });
}




module.exports = payment;
