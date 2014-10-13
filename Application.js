'use strict';

let
	compress = require('koa-compress'), 
	config = require('./config'),
	controller = require('./controllers'),
	koa = require('koa'),
	logger = require('koa-logger'),
	middleware = require('./middleware'),
	path = require('path'),
	route = require('koa-route'),
	static = require('koa-static');


function App() {}

App.prototype.setMiddleware = function () {};

App.prototype.start = function () {};


module.exports = App;
