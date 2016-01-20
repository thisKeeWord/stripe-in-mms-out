// twilio creds
var Config = require('./../config.js');
// require twilio module and create a REST client
var Twilio = require('twilio')(Config.ACCOUNTSID, Config.AUTHTOKEN);
var image = require('./../images/images.js');
var fs = require('fs');

var Texting = {};
Texting.sendingText = sendingText;


function sendingText(req, res){

  Twilio.messages.create({
    to: '+1' + req.body.phone,
    from: Config.from,
    body: 'testiloveing',
    mediaUrl: image[0]
  }, function(err, message) {
    if (err) next();
    else {
    console.log(message);
    }
  })
}



module.exports = Texting;
