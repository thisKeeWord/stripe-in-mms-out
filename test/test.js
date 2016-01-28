'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const pk = require ('../server/popkeyController.js');
const superTest = require('supertest');
const chai = require ('chai');
const chaiHttp = require('chai-http')
const async = require ('async');

const app = express();
const expect = chai.expect;

chai.use(chaiHttp);
app.use(bodyParser.urlencoded());

describe('GET /', function(){
  it('responds with index.html', function(done){
    superTest('localhost:8080')
      .get('/')
			.set('Accept', 'text/html')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});
describe('POST /stripe', function(){
  it('should return 200 status', function(done){
    chai.request('localhost:8080')
      .post('/stripe')
      .send({'topic':'pizza','pictureAmount':5})
      .end(function(err, res){
        expect(res).to.have.status(200)
        if (err) return done(err);
        done();
      });
  });
});
describe('get_GIF_images', function(){
	it('should have specified number of earls', function(done){
		let queryString = 'rainbows',
				integers = [1,10,28];

    async.each(integers,
      function(int, callback){
        pk.get_GIF_images(queryString, int, function(err, gif_urls) {
        expect(int).to.eql(gif_urls.length);
        callback();
      });
    }, done());
  });

	it('each earl should send a 200 response', function(done){
		let queryString = 'books',
				integers = [1,10,28];
    async.each(integers,
      function(int, callback){
        pk.get_GIF_images(queryString, int, function(err, gif_urls) {
          superTest(app)
            .get(gif_urls)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
              if (err) return done(err);
            });
        callback();
      });
    }, done());
	});
});
