/*
 The Sequelizer class creates the sequelize object,
 imports all the separate class definitions,
 then declares the relationships & returns the class object.
 */
'use strict';
var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    _         = require('lodash'),
    config    = require('../Config/config'),
    sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
      host    : config.db.host,
      port    : config.db.port,
      dialect : 'mysql',
      define  : {
        timestamps: false,
        charset   : 'utf8',
        collate   : 'utf8_general_ci'
      },
      pool    : {
        maxConnections: 100, maxIdleTime: 30000
      },
      timezone: 'Australia/Sydney',
      logging : console.log
    }),
    db        = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const model      = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db)
  .forEach(modelName => {
    if (db[modelName].options.hasOwnProperty('associate')) {
      db[modelName].options.associate(db);
    }
  });

/*
 the 'sequelize' object defined above
 is then extended from the actual
 'Sequelize' object provided by the ORM
 */
module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
