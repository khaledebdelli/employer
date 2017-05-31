'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('Leaves',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "begindate": {
                    "type": Sequelize.DATE
                },
                "enddate": {
                    "type": Sequelize.DATE
                },
                "type": {
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
                "employeId": {
                    "type": "INTEGER",
                    "allowNull": true,
                    "references": {
                        "model": "Employes",
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
            return queryInterface.dropTable('Leaves');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};