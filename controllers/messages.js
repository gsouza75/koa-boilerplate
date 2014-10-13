'use strict';

let
  parse = require('co-body'),
  View = require('../helpers/View');


let messages = [
  { id: 0, message: 'Koa next generation web framework for node.js' },
  { id: 1, message: 'Koa is a new web framework designed by the team behind Express' }
];


module.exports.home = function *home() {
  let view = new View(this, { messages: messages }, { templateName: 'list' });
  let rendered = view.render();
  this.body = typeof rendered === 'string' ? rendered : yield rendered;
};

module.exports.list = function *list() {
  this.body = yield messages;
};

module.exports.fetch = function *fetch(id) {
  let message = messages[id];
  if (!message) {
    this.throw(404, 'message with id = ' + id + ' was not found');
  }
  this.body = yield message;
};

module.exports.create = function *create() {
  let message = yield parse(this);
  let id = messages.push(message) - 1;
  message.id = id;
  this.redirect('/');
};

function doSomeAsync() {
  return function (callback) {
    setTimeout(function () {
      callback(null, 'this was loaded asynchronously and it took 3 seconds to complete');
    }, 3000);
  };
}

// One way to deal with asynchronous call
module.exports.delay = function *delay() {
  this.body = yield doSomeAsync();
};