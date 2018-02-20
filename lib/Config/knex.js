/* global module */

var config = require('./config'),
    Knex   = require('knex');

var knex = Knex({
  client    : 'mysql',
  connection: {
    host    : config.db.host,
    port    : config.db.port,
    database: config.db.name,
    user    : config.db.user,
    password: config.db.password,
    timezone: 'AEDT'
  },
  pool      : {
    min: 2,
    max: 10
  },
  debug     : true
});

module.exports = function () {
  return knex;
};
