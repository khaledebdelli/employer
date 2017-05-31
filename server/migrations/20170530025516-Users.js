'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('Users',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "firstname": {
                    "type": "VARCHAR(255)"
                },
                "lastname": {
                    "type": "VARCHAR(255)"
                },
                "email": {
                    "type": "VARCHAR(255)"
                },
                "password": {
                    "type": "VARCHAR(255)"
                },
                "active": {
                    "type": "TINYINT(1)"
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
                },
                "permissionId": {
                    "type": "INTEGER",
                    "allowNull": true,
                    "references": {
                        "model": "Permissions",
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
            return queryInterface.dropTable('Users');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};