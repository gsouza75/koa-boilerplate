'use strict';

var View = require('./view');


function ErrorView(context, error, options) {
	View.apply(this, arguments);

	let errorStatus = error.status;
	if (errorStatus != null) {
		this.status = errorStatus;
	}

	this.setStatus();
	this.content = { message: error.message, status: this.status };
}

ErrorView.prototype = Object.create(View.prototype);

ErrorView.prototype.constructor = ErrorView;

ErrorView.prototype.defaultOptions = {
	status: 500,
	templateName: 'error'
};


module.exports = ErrorView;
