'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('Demandes',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "montant": {
                    "type": "VARCHAR(255)"
                },
                "cause": {
                    "type": "VARCHAR(255)"
                },
                "decision": {
                    "type": "TINYINT(1)",
                    "defaultValue": false
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
                },
                "userId": {
                    "type": "INTEGER",
                    "allowNull": true,
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE"
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
            return queryInterface.dropTable('Demandes');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};