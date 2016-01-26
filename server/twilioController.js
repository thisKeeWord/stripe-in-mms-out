// twilio creds
var Config = require('./../config.js');
// require twilio module and create a REST client
var Twilio = require('twilio')(Config.ACCOUNTSID, Config.AUTHTOKEN);
var image = require('./../images/images.js');
var Images = require('./popkeyController');

var Texting = {};
Texting.sendingText = sendingText;

function sendingText(req, res){
  //Limit total number of pictures to be 5 max
  if(req.body.pictureAmount > 5) req.body.pictureAmount = 5
  Images.get_GIF_images(req.body.topic, req.body.pictureAmount, function(err, gif_urls) {
    for (var i = 0; i < gif_urls.length; i++) {
      Twilio.messages.create({
        to: '+1' + req.body.phone,
        from: Config.from,
        body: 'testiloveing',
        mediaUrl: gif_urls[i]
      }, function(err, message) {
        if (err) console.error(err, message);
        else {
        //   console.log(message);
        }
      })
    }
  })
}



module.exports = Texting;
