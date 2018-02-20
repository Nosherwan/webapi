/**
 Created by nosh on 23/05/14
 **/
const express      = require('express');
const TradieCtrl     = require('../Controllers/TradiesController');
const authenticate = require('../Auth').validateJWT;

exports = module.exports = function () {
  "use strict";
  const router = express.Router();

  router.route('/tradie')
    //.all(authenticate)
    .get(TradieCtrl.index)
    .put(TradieCtrl.update)
    .post(TradieCtrl.create);

  return router;
};
