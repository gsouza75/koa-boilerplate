'use strict';

// let controllers = require('../controllers'),
let	messages = require('../controllers/messages'); //controllers.messages;


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
