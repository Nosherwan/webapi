/* Loads all the route files in the current routes folder
 and imports all the routeHandlers defined in them */

exports = module.exports = function (app) {
  'use strict';

  require('fs')
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    }).forEach(file => {
      const routePath = require('path').join(__dirname, file);
      const route = require(routePath);
      app.use('/api', route());
    });
};
