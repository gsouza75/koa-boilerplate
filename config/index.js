'use strict';

var viewEngine = require('co-views');


module.exports = {

	template: function () {
		return viewEngine('views', {
		  map: {
		    html: 'swig',
		    md: 'hogan'
		  }
		});
	}

};
