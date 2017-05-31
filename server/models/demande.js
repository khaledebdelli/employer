
module.exports = function(sequelize, DataTypes) {
  let Demande = sequelize.define('Demande', {
    montant: DataTypes.STRING,
    cause: DataTypes.STRING,
    decision: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
          Demande.belongsTo(models.User, {
              foreignKey: 'userId',
              as :'user'
          });
      }
    }
  });
  return Demande;
};