/* global module, exports:true */

'use strict';

class JobsHelper {

  constructor() {
  }

  validateJob(job) {
    return (
      job.postcode &&
      job.category &&
      job.description &&
      job.customer_name &&
      job.email &&
      JobsHelper.validateEmail(job.email) &&
      job.mobile_no &&
      (job.status.toLowerCase() === ('new' || 'assigned' || 'hired')))
  }

  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

exports = module.exports = JobsHelper;
