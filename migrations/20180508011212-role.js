'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { STRING, INTEGER, DATE } = Sequelize
    return queryInterface.createTable('role', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true
      },
      name: {
        type: STRING,
        unique: true,
        allowNull: false
      },
      createdAt: DATE,
      updatedAt: DATE
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('role')
  }
};
