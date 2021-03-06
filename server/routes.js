/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {
  var env = app.get('env');

  // Insert routes below
  app.use('/api/settings', require('./api/settings'));
  app.use('/api/agenda', require('./api/agenda'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

   if (env !== 'production') {
     app.route('/playground').get(function(req, res) {
       res.sendFile(path.join(__dirname, '../client/app/components/index.html'));
     });
   }

  // All other routes should redirect to the index.html
  // app.route('/*')
  app.route('/')
    .get(function(req, res) {
      var rootDir = process.env.NODE_ENV === 'production' ? '../public' : '../client';
      res.sendFile(path.join(__dirname, rootDir, 'index.html'));
    });
};
