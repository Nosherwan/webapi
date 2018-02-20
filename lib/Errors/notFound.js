/*
NotFoundError
 */

function NotFoundError(message) {
  this.message = message;
  this.name = 'NotFoundError';
  Error.captureStackTrace(this,NotFoundError);
};

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

exports = module.exports = NotFoundError;
