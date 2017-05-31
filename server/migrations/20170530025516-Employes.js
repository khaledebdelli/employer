'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('Employes',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "matricule": {
                    "type": "VARCHAR(255)"
                },
                "poste": {
                    "type": "VARCHAR(255)"
                },
                "firstname": {
                    "type": "VARCHAR(255)"
                },
                "lastname": {
                    "type": "VARCHAR(255)"
                },
                "address": {
                    "type": "VARCHAR(255)"
                },
                "sonsnbr": {
                    "type": "VARCHAR(255)"
                },
                "status": {
                    "type": "VARCHAR(255)"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false,
                    "defaultValue": Sequelize.fn('now')
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false,
                    "defaultValue": Sequelize.fn('now')
                }
            })
        })

        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.dropTable('Employes');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};