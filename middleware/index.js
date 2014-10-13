'use strict';

var ErrorView = require('../helpers/error_view');

module.exports = {

	error: function *(next) {
	  try {
	    yield next;
	  } catch (err) {
	    let errorView = new ErrorView(this, err);
	    let rendered = errorView.render();
	    this.body = typeof rendered === 'string' ? rendered : yield rendered;

	    // since we handled this manually we'll
	    // want to delegate to the regular app
	    // level error handling as well so that
	    // centralized still functions correctly.
	    this.app.emit('error', err, this);
	  }
	}

};
