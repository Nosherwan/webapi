'use strict';

module.exports = function (sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
      ID          : {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
      PostCode    : {type: DataTypes.STRING(5), allowNull: false},
      Category    : {type: DataTypes.STRING(48), allowNull: false, defaultValue: ''},
      Description : {type: DataTypes.STRING(256), allowNull: false},
      CustomerName: {type: DataTypes.STRING(128), allowNull: false, defaultValue: ''},
      Email       : {type: DataTypes.STRING(128), allowNull: false, defaultValue: ''},
      MobileNo    : {type: DataTypes.STRING(24), allowNull: false},
      CreatedBy   : {type: DataTypes.STRING(32), allowNull: false, defaultValue: ''},
      CreatedOn   : {type: DataTypes.DATE, allowNull: false},
      ModifiedBy  : {type: DataTypes.STRING(32), allowNull: true, defaultValue: ''},
      ModifiedOn  : {type: DataTypes.DATE, allowNull: true},
      IsDeleted   : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    }, {
      freezeTableName: true,
      associate: function (models){
      Job.belongsToMany(models.Tradie, {through: models.JobTradie});
      }
    }
  );
  return Job;
};
