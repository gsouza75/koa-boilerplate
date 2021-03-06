'use strict';

let
  compress = require('koa-compress'),
  config = require('./config'),
  koa = require('koa'),
  logger = require('koa-logger'),
  middlewares = require('./middlewares'),
  route = require('koa-route'),
  routes = require('./routes'),
  serve = require('koa-static'),
  View = require('./helpers/View');


function App() {
  this.koaApp = koa();
  this.config = config;
  this.routes = routes;
  this.applyMiddlewares();
}

App.prototype.applyMiddlewares = function () {
  this.koaApp.use(logger());
  this.applyCustomMiddlewares();
  this.applyRouteHandlers();
  this.koaApp.use(serve(this.config.staticDir));
  this.koaApp.use(compress());
};

App.prototype.applyCustomMiddlewares = function () {
  for (let middleware in middlewares) {
    this.koaApp.use(middlewares[middleware]);
  }
};

App.prototype.applyRouteHandlers = function () {

  // Make a route-handling generator wrapper
  // given a handler function.
  function generateHandlerWrapper(fnHandler) {
    return function *() {
      let returnValue = fnHandler.apply(this, arguments);

      if (returnValue instanceof View) {
        returnValue = returnValue.render(this);
      }

      this.body = typeof returnValue === 'string' ?
        returnValue :
        yield returnValue;
    };
  }

  for (let verb in this.routes) {
    let handlers = this.routes[verb];

    for (let urlPath in handlers) {
      let handler = handlers[urlPath];
      this.koaApp.use(route[verb](urlPath, generateHandlerWrapper(handler)));
    }
  }
};

App.prototype.start = function () {
  let config = this.config,
    port = config.port;

  console.log('Starting app %s with config:', config.name);
  console.dir(config);

  this.koaApp.listen(port);

  console.log('\nListening on port %d', port);
};


module.exports = App;
