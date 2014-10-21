'use strict';

let View = require('./View');


function ErrorView(template, error) {
  View.apply(this, arguments);

  let errorStatus = error.status;
  if (errorStatus) {
    this.status = errorStatus;
  }

  this.content = { message: error.message, status: this.status };
}

ErrorView.prototype = Object.create(View.prototype);

ErrorView.prototype.constructor = ErrorView;

ErrorView.prototype.defaults = {
  status: 500,
  template: 'error'
};


module.exports = ErrorView;
