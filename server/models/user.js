
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role: {
      type: DataTypes.STRING,
      get: function() {
          return this.getDataValue('role').split(",");
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
          User.belongsTo(models.Permission, {
              foreignKey: 'permissionId',
              as :'permission'
          });
          User.hasMany(models.Demande, {
              foreignKey: 'UserId',
              as: 'demandes',
          });

      }
    }
  });
  return User;
};