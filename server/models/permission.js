
module.exports = function(sequelize, DataTypes) {
  let Permission = sequelize.define('Permission', {
    resource: {
        type: DataTypes.STRING,
        get: function() {
            return this.getDataValue('resource').split(",");
        },
        set: function(val) {
            return this.setDataValue('resource', val.toString());
        }
    },
      role: {
          type: DataTypes.STRING,
          get: function() {
              return this.getDataValue('role').split(",");
          }
      }
  }, {
    classMethods: {
      associate: function(models) {
          Permission.hasMany(models.User, {
              foreignKey: 'permissionId',
              as: 'users',
          });
      }
    }
  });
  return Permission;
};