const express = require('express');
const JobCtrl = require('../Controllers/JobsController');
const authenticate = require('../Auth').validateJWT;

exports = module.exports = function () {
  "use strict";
  const JobRouter = express.Router();

  JobRouter.route('/job')
    .all(authenticate)
    .get(JobCtrl.index)
    .put(JobCtrl.update)
    .post(JobCtrl.create);

  JobRouter.route('/job/:id')
    .all(authenticate)
    .get(JobCtrl.get);

  JobRouter.route('/job/:jid/assigntradie/:tid')
    .all(authenticate)
    .post(JobCtrl.assign);

  JobRouter.route('/job/:id/assignments')
    .all(authenticate)
    .get(JobCtrl.getAssignments);

  JobRouter.route('/job/:jid/hiretradie/:tid')
    .all(authenticate)
    .post(JobCtrl.hire);

  return JobRouter;
};
