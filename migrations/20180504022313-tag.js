'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   const {INTEGER, STRING, DATE} = Sequelize
    return queryInterface.createTable('tag', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        unique: true,
        allowNull: false
      },
      createdAt: DATE,
      updatedAt: DATE,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tag')
  }
};
