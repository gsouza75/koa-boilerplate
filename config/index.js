'use strict';

let 
  _ = require('lodash'),
  path = require('path'),
  viewEngine = require('co-views');


let env = process.env;

function Config() {
  _.defaults(this, this.defaults);
  _.merge(this, this.getHomeConfig());
}

Config.prototype.defaults = {
  homeDir: env.HOME || env.HOMEPATH || env.USERPROFILE,

  name: 'koa-boilerplate-app',

  port: 3000,

  staticDir: path.join(__dirname, '..', 'public'),

  template: function () {
    return viewEngine('views', {
      map: {
        html: 'swig',
        md: 'hogan'
      }
    });
  }
};

Config.prototype.getHomeConfig = function () {
  let configPath = path.join(this.homeDir, '.' + this.name),
    homeConfig = {};

  try {
    homeConfig = require(configPath);
    console.log('Found home config in %s.', configPath);
  } catch (err) {
    console.log('No home config found in %s. %s', configPath, err);
  }

  return homeConfig;
};


module.exports = new Config();
