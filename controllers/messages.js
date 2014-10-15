'use strict';

let
  parse = require('co-body'),
  View = require('../helpers/View');


let messages = [
  { id: 0, message: 'Koa next generation web framework for node.js' },
  { id: 1, message: 'Koa is a new web framework designed by the team behind Express' }
];


module.exports.home = function home() {
  return new View(this, { messages: messages }, { templateName: 'list' });
};

module.exports.list = function list() {
  return messages;
};

module.exports.fetch = function fetch(id) {
  let message = messages[id];
  if (!message) {
    this.throw(404, 'message with id = ' + id + ' was not found');
  }
  return message;
};

module.exports.create = function *create() {
  let message = yield parse(this);
  let id = messages.push(message) - 1;
  message.id = id;
  this.redirect('/');
  return -1;
};

function doSomeAsync() {
  return function (callback) {
    setTimeout(function () {
      callback(null, 'this was loaded asynchronously and it took 3 seconds to complete');
    }, 3000);
  };
}

// One way to deal with asynchronous call
module.exports.delay = function delay() {
  return doSomeAsync();
};