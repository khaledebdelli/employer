
module.exports = function(sequelize, DataTypes) {
    let Annonce = sequelize.define('Annonce', {
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
    return Annonce;
};