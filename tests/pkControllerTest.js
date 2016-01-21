'use strict'
const test = require('tape')
const assert = require('assert')
const popKeyController = require('./../server/popKeyController')
const request = require('request')

test('1 compare length to one given as function argument.', t => {
		t.plan(7)
		for (let count = 1; count < 29; count += 4) {
			popKeyController.get_GIF_images('pizza', count, (err, gif_urls) => {
				t.equal(gif_urls.length, count) //	t.equal(actual, expected)
			})
		}
	}) // END OF: length test

test('2 that URLs received are not returning any errors', t => {
			t.plan(28)
			popKeyController.get_GIF_images('pizza', 28, (err, gif_urls) => {
				gif_urls.forEach(url => {
					request(url, (error, response, body) => {
						t.equal(error, null)
					})
				})
			})
		})
