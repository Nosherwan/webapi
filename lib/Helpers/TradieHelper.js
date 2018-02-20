/* global module, exports:true */

'use strict';

class TradieHelper {

  constructor() {
  }

  validateTradie(tradie) {
    return (
      tradie.name &&
      tradie.email &&
      TradieHelper.validateEmail(tradie.email) &&
      tradie.mobile_no)
  }

  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

exports = module.exports = TradieHelper;
