var path = require('path');
var express = require('express');

module.exports = [
  express.static(path.join(__dirname, './../images/Menu_CheesePizza.png'))
];
