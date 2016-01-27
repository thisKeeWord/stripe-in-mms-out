
// TODO: MVP of background img/gif rotation, performance is terrible though, must cache images
var gifControl = {
	gifArray: [
		'gifs/1.gif',
		'gifs/2.gif',
		'gifs/3.gif',
		'gifs/4.gif',
		'gifs/5.gif',
		'gifs/6.gif',
		'gifs/7.gif',
		'gifs/8.gif',
		'gifs/9.gif',
		'gifs/10.gif',
		'gifs/11.gif',
		'gifs/12.gif',
		'gifs/13.gif',
		'gifs/14.gif',
		'gifs/15.gif',
		'gifs/16.gif',
		'gifs/17.gif',
		'gifs/18.gif',
		'gifs/19.gif',
		'gifs/20.gif',
		'gifs/21.gif',
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
var body = document.getElementsByTagName("BODY")[0];
body.style.backgroundImage = 'url(' + firstImg.src + ')';
var gifs = gifControl.getGifs();
setInterval(function() {
	(counter >= gifs.length - 1) ? counter = 0 : counter++
	body.style.backgroundImage = 'url(' + gifs[counter].src + ')';
}, 3500)
