// twilio creds
var Config = require('./../config.js');
// require twilio module and create a REST client
var Twilio = require('twilio')(Config.ACCOUNTSID, Config.AUTHTOKEN);

var Texting = {};
Texting.sendingText = sendingText;

var sendingText = function(){

  Twilio.messages.create({
    to: Config.cruzNum,
    from: '+13345441690',
    body: 'testiloveing',
    mediaUrl: 'http://littlecaesars.com/portals/0/Menu_CheesePizza.png'
  }, function(err, message) {
    if (err) console.error(err);
    else {
    console.log(message);
    }
  });
}

sendingText();

module.exports = Texting;
