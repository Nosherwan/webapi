/*
 * This is a sequelize model class. Needs to be imported by sequelize object
 * and relationships initialized.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
  var Tradie = sequelize.define("Tradie", {
    ID               : {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    Name             : {type: DataTypes.STRING(128), allowNull: false},
    MobileNo         : {type: DataTypes.STRING(24), allowNull: false},
    Email            : {type: DataTypes.STRING(128), allowNull: false},
    IsActive         : {type: DataTypes.BOOLEAN, allowNull: false},
    CreatedBy        : {type: DataTypes.STRING(32), allowNull: false, defaultValue: ''},
    CreatedOn        : {type: DataTypes.DATE, allowNull: false},
    ModifiedBy       : {type: DataTypes.STRING(32), allowNull: true, defaultValue: ''},
    ModifiedOn       : {type: DataTypes.DATE, allowNull: true},
    IsDeleted        : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  }, {
    freezeTableName: true,
    associate      : function (models) {
      Tradie.belongsToMany(models.Job, {through: 'JobTradie'});
    }
  });

  return Tradie;
};
