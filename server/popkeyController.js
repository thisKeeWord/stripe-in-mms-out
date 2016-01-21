'use strict'
const path = require('path')
const request = require('request')
const cheerio = require('cheerio')

// method on popkey controller, takes in:
//	1. string representing popkey img search input.
//	2. # of GIFs you wantfrom popkey (limited to 27).
// 	3. a callback fn to execute afterwords (to avoid async issues).
// 	=> returns an err || an array of gif_urls

const get_GIF_images = (queryString, numberOfPhotos, callback) => {
	request('https://popkey.co/search/' + queryString, (reqErr, response, html) => {
		let $ = cheerio.load(html)
		let dataTiles = $('.tiles').children()
		let gif_urls = []
		dataTiles.each((i, tile) => {
			if (i < numberOfPhotos) {
				let src = $('img', tile)
				gif_urls.push(src[0].attribs['data-animated'])
			}
		}) //END OF: dataTiles.each(i, tile)
		let err = reqErr || null;
		callback(err, gif_urls)
	}) // END OF: request('popkey.co/search', fn)
} // END OF: get_GIF_images


/* EXAMPLE
 * this function:
   get_GIF_images('turkey', 2, (err, gif_urls) => console.log(gif_urls))

 * returns this array:
	[ 'https://m.popkey.co/429a96/rzYmW_s-200x150.gif',
  'https://m.popkey.co/e44570/bg03q_s-200x150.gif' ]
*/
module.exports = { get_GIF_images };
