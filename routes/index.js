'use strict';

let	messages = require('../controllers/messages');


module.exports = {

	get: {
		'/': messages.home,
		'/messages': messages.list,
		'/messages/:id': messages.fetch,
		'/async': messages.delay
	},

	post: {
		'/messages': messages.create
	}
};
