'use strict';

module.exports = function (sequelize, DataTypes) {
  var JobTradie = sequelize.define('JobTradie', {
    Status: { type: DataTypes.STRING(10), allowNull: false },
  }, {
      freezeTableName: true
    }
  );
  return JobTradie;
};