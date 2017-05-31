
module.exports = function(sequelize, DataTypes) {
  let Employe = sequelize.define('Employe', {
    matricule: DataTypes.STRING,
    poste: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    sonsnbr: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
        associate: function(models) {
            Employe.hasMany(models.Leave, {
                foreignKey: 'employeId',
                as: 'leaves',
            });


        }
    }
  });
  return Employe;
};