// twilio creds
var Config = require('./../config.js');
// require twilio module and create a REST client
var Twilio = require('twilio')(Config.ACCOUNTSID, Config.AUTHTOKEN);

var Texting = {};
Texting.sendingText = sendingText;

function sendingText(req, res){

  Twilio.messages.create({
    to: '+1' + req.body.phone,
    from: Config.from,
    body: 'testiloveing',
    mediaUrl: 'http://littlecaesars.com/portals/0/Menu_CheesePizza.png'
  }, function(err, message) {
    if (err) console.error(err);
    else {
    console.log(message);
    }
  });
}



module.exports = Texting;
