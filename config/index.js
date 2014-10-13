'use strict';

let 
	_ = require('lodash'),
	path = require('path'),
	viewEngine = require('co-views');


function Config() {
	_.defaults(this, this.defaults);
	this.applyOverride();
}

Config.prototype.defaults = {
	name: 'koa-boilerplate-app',

	port: 3000,

	template: function () {
		return viewEngine('views', {
		  map: {
		    html: 'swig',
		    md: 'hogan'
		  }
		});
	}
};

Config.prototype.applyOverride = function () {
	let userHome = this.getUserHome(),
		configPath = path.join(userHome, '.' + this.name),
		profileOverrides;

	try {
		profileOverrides = require(configPath);
		_.merge(this, profileOverrides);
		console.log('Applied config override in %s.', configPath);
	} catch (err) {
		console.log('No config override found in %s.', configPath);
	}
};

Config.prototype.getUserHome = function () {
	return process.env.HOME || 
		process.env.HOMEPATH || 
		process.env.USERPROFILE;
};


module.exports = new Config();
