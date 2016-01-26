
// TODO: MVP of background img/gif rotation, performance is terrible though, must cache images
var gifControl = {
	gifArray: [
	'https://media.giphy.com/media/raBbE1fizfZGE/giphy.gif',
	'https://media.giphy.com/media/pRnUtEUEUyxoY/giphy.gif',
	'https://media.giphy.com/media/QXagUlpya3yyQ/giphy.gif',
	'https://m.popkey.co/fb42c7/6mVrO.gif?c=popkey-web&p=popkey&i=sciencetech-ent&l=direct&f=.gif',
	'https://m.popkey.co/429a28/1Zgpx.gif',
	'https://m.popkey.co/807aa5/Ep77Q_f-maxage-0.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/a3831c/XRpwx.gif',
	'https://m.popkey.co/1c90e3/pxL8_f-maxage-0.gif',
	'https://m.popkey.co/add174/oGWX9.gif',
	'https://m.popkey.co/16f1fe/JLL8v.gif',
	'https://media.giphy.com/media/Ywg4EIvQfdNmw/giphy.gif',
	'https://m.popkey.co/c888ad/3GpKb.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/17905b/5mp3A.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/819aae/Wk990_f-maxage-0.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/65d565/LlOgy.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/428f97/R4oEa_f-maxage-0.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/6c3c1c/dgD43.gif?c=popkey-web&p=popkey&i=hotlinebling&l=direct&f=.gif',
	'https://m.popkey.co/45cf3f/3REMZ_f-maxage-0.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/4cbd35/86VMW.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/7272ba/xqKk4.gif?c=popkey-web&p=cheezburger&i=cheezburger-ent&l=direct&f=.gif',
	'https://m.popkey.co/a69e8c/Vl8Qe.gif',
],
	getGifs: function(){
		var gifs = [];
		//preload  them images
		//limit number of images sent to browser to 7, get 7 random numbers
		var gifIndex = this.getRandomNums(this.gifArray.length);
		// map random numbers to gifs variable to display
		gifs = gifIndex.map((i) =>{
			var img = new Image();
			img.src = this.gifArray[i];
			return img;
		})
		return gifs;
	},
	//Limit number of gifs to send client for background to 7 here is the random num generator
	getRandomNums: function(len){
		var inds = [];
		while(inds.length < 8){
			var rand = Math.floor(Math.random()*len);
			if(inds.indexOf(rand) < 0){
				inds.push(rand);
			}
		}
		return inds;
	}
}

var counter = 1;
var firstImg = new Image();
// choose a random image for the first image to load
firstImg.src = gifControl.gifArray[Math.floor(Math.random() * gifControl.gifArray.length)];
var gifs = gifControl.getGifs();
var body = document.getElementsByTagName("BODY")[0]
body.style.backgroundImage = 'url(' + firstImg.src + ')';
setInterval(function() {
	(counter >= gifs.length - 1) ? counter = 0 : counter++
	body.style.backgroundImage = 'url(' + gifs[counter].src + ')';
}, 3500)
