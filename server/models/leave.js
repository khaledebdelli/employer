
module.exports = function(sequelize, DataTypes) {
  let Leave = sequelize.define('Leave', {
    begindate: DataTypes.STRING,
    enddate: DataTypes.STRING,
    type: DataTypes.STRING,
    decision: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
          Leave.belongsTo(models.Employe, {
              foreignKey: 'employeId',
              as :'employe'
          });
      }
    }
  });
  return Leave;
};