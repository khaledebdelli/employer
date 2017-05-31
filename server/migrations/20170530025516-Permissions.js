'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('Permissions',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "resource": {
                    "type": "VARCHAR(255)"
                },
                "role": {
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
            return queryInterface.dropTable('Permissions');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};