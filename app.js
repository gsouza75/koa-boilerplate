'use strict';
var messages = require('./controllers/messages');
var middleware = require('./middleware')
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var config = require('./config')
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(middleware.error);
app.use(route.get('/', messages.home));
app.use(route.get('/messages', messages.list));
app.use(route.get('/messages/:id', messages.fetch));
app.use(route.post('/messages', messages.create));
app.use(route.get('/async', messages.delay));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
	console.log('Starting app %s with config:', config.name);
	console.dir(config);
	let port = config.port;
  app.listen(port);
  console.log('\nListening on port %d', port);
}