// twilio creds
var Config = require('./../config.js');
// require twilio module and create a REST client
var Twilio = require('twilio')(Config.ACCOUNTSID, Config.AUTHTOKEN);
var image = require('./../images/images.js');

var Texting = {};
Texting.sendingText = sendingText;

function sendingText(req, res){
  Twilio.messages.create({
    to: '+1' + req.body.phone,
    from: Config.from,
    body: 'testiloveing',
    mediaUrl: image[Math.round(Math.random() * 4)],
  }, function(err, message) {
    if (err) console.error(err);
    else {
      console.log(message);
    }
  })
}



module.exports = Texting;
