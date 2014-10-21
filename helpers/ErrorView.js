'use strict';

let 
  _ = require('lodash'),
  View = require('./View');


function ErrorView(template, error, options) {
	View.apply(this, arguments);

	let errorStatus = error.status;
	if (errorStatus) {
		this.status = errorStatus;
	}

	// this.setStatus();
	this.content = { message: error.message, status: this.status };
}

ErrorView.prototype = Object.create(View.prototype);

ErrorView.prototype.constructor = ErrorView;

ErrorView.prototype.defaults = {
	status: 500,
	template: 'error'
};


module.exports = ErrorView;
