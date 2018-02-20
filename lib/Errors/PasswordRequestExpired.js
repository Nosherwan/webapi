function PasswordRequestExpiredError(message) {
  this.message = message;
  this.name = 'PasswordRequestExpiredError';
  Error.captureStackTrace(this, PasswordRequestExpiredError);
};

PasswordRequestExpiredError.prototype = Object.create(Error.prototype);
PasswordRequestExpiredError.prototype.constructor = PasswordRequestExpiredError;

exports = module.exports = PasswordRequestExpiredError;

