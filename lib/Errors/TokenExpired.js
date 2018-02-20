

function TokenExpiredError(message) {
  this.message = message;
  this.name    = 'TokenExpiredError';
  Error.captureStackTrace(this, TokenExpiredError);
}

TokenExpiredError.prototype             = Object.create(Error.prototype);
TokenExpiredError.prototype.constructor = TokenExpiredError;

exports = module.exports = TokenExpiredError;
