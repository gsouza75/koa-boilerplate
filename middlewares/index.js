'use strict';

let ErrorView = require('../helpers/ErrorView');


module.exports = {

  error: function *(next) {
    try {
      yield next;
    } catch (err) {
      let errorView = new ErrorView('error', err),
        rendered;

        rendered = errorView.render(this);
      
      this.body = typeof rendered === 'string' ? 
        rendered : 
        yield rendered;

      // since we handled this manually we'll
      // want to delegate to the regular app
      // level error handling as well so that
      // centralized still functions correctly.
      this.app.emit('error', err, this);
    }
  },

  removeHeaders: function *(next) {
    this.response.remove('X-Powered-By');
    yield next;
  }

};
