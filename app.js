'use strict';
let messages = require('./controllers/messages');
let middleware = require('./middleware')
let compress = require('koa-compress');
let logger = require('koa-logger');
let serve = require('koa-static');
let route = require('koa-route');
let koa = require('koa');
let path = require('path');
let config = require('./config')
let app = module.exports = koa();

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