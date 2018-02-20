'use strict';

var eventEmitter = require('events').EventEmitter;

function Authenticator() {
  eventEmitter.call(this);
}

Authenticator.prototype             = Object.create(eventEmitter.prototype);
Authenticator.prototype.constructor = Authenticator;

Authenticator.prototype.validateJWT = function (req, res, next) {

  let bearerToken = req.headers['Authorization'] || req.headers['authorization'];
  bearerToken     = bearerToken ? bearerToken.split(' ')[1] : '';

  const token =
        (req.body && req.body.access_token) ||
        (req.query && req.query.access_token) ||
        req.headers['x-access-token'] ||
        bearerToken;

  if (token && token !== undefined) {
    try {
     //NOTE: assuming token is authorized and authenticated
     next();

    } catch (err) {
      return next(err);
    }
  } else {
    res.status(401).end();
  }
};

module.exports = new Authenticator();
