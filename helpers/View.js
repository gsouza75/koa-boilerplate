'use strict';

let 
  _ = require('lodash'),
  config = require('../config');


function View(template, content, options) {
  // if (!context) {
  //   throw new Error('Context is required');
  // }

  if (!options) {
    options = {};
  }

  _.defaults(options, this.defaults);
  
  _.defaults(this, { 
    template: template,
    content: content
  },  options);

  // this.setStatus();
  // this.setMediaType();
}

View.prototype.defaults = {
  status: 200,
  template: 'layout'
};

View.prototype.setContext = function (context) {
  this.context = context;
  return this;
};

View.prototype.setStatus = function () {
  this.context.status = this.status;
  return this;
};

View.prototype.setMediaType = function () {
  let mediaType = this.context.accepts('json', 'html', 'text');

  switch (mediaType) {
    case 'json': 
    case 'html':
    case 'text':
      this.mediaType = this.context.type = mediaType;
    break;
    default:
      this.context.throw(406, 'Cannot serve media type ' + mediaType);
  }

  return this;
};

View.prototype.render = function () {
  return this[this.mediaType]();
};

View.prototype.json = function () {
  return this.content || {};
};

View.prototype.html = function () {
  return config.template()(this.template, this.content);
};

View.prototype.text = function () {
  /* jshint eqnull: true */
  if (this.content == null) {
    return '';
  }

  return typeof this.content === 'object' ?
    JSON.stringify(this.content) :
    '' + this.content;
};


module.exports = View;
