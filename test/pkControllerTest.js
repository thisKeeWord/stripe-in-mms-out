'use strict'
const request = require ('request');
const express = require('express');
const bodyParser = require('body-parser');
const pk = require ('../server/popkeyController.js');
const superTest = require('supertest');
const chai = require ('chai');

const app = express();
const expect = chai.expect;

app.use(bodyParser.urlencoded());

describe('GET /', function(){
  it('responds with json', function(done){
    // console.log(app);
    superTest('app')
      .get('/')
			.set('Accept', 'text/html')
      .expect(function(req) {
        expect(req.body.topic).to.be.a('String');
        expect(req.body.pictureAmount).to.be.a('Number');
      })
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});
describe('get_GIF_images', function(){
	it('should have specified number of earls', function(){
		let queryString = 'rainbows',
				integers = [1,10,28];

		pk.get_GIF_images(queryString, integers, function() {
			for(var el of integers ){
				expect(el).to.eql(gif_urls);
			}
			done();
		});
	});

	it('each earl should send a 200 response', function(done){
		let queryString = 'yonce',
				integers = [1,10,28];

		pk.get_GIF_images(queryString, integers, function(err, gif_urls) {
			for(var el of integers ){
				superTest(app)
		      .get(gif_urls)
		      .set('Accept', 'application/json')
		      .expect(200)
		      .end(function(err, res){
		        if (err) return done(err);
            done();
		      });
			}
		});
	});
});
