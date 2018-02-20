/**
 * Created with JetBrains WebStorm.
 * User: nosh
 * Date: 14/02/13
 * Time: 1:43 PM
 * To change this template use File | Settings | File Templates.
 */
var path           = require('path'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function (app, express, siteSecret) {

  app.use(function allowCORS(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent, Authorization');

    if ('OPTIONS' == req.method)
      res.status(200,'').end();
    else
      next();
  });

  var env = process.env.NODE_ENV;

  if (env === 'development') {

  }

  else if (env === 'production') {
    
  }

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride());

  //Error logger has a specific signature with four params, first one being error.
  app.use(function (err, req, res, next) {
    console.log(err);
    next();
  });
};
