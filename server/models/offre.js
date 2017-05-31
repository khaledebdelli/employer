
module.exports = function(sequelize, DataTypes) {
    let Offre = sequelize.define('Offre', {
        datepublication: DataTypes.STRING,
        dateexpiration: DataTypes.STRING,
        titre: DataTypes.STRING,
        libelle: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                //
            }
        }
    });
    return Offre;
};