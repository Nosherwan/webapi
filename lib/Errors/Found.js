/*
 NotFoundError
 */

function FoundError(message) {
  this.message = message;
  this.name = 'FoundError';
  Error.captureStackTrace(this, FoundError);
};

FoundError.prototype = Object.create(Error.prototype);
FoundError.prototype.constructor = FoundError;

exports = module.exports = FoundError;
