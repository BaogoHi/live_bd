'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {INTEGER,DATE} = Sequelize
    return queryInterface.createTable('userRole', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true
      },
      userId: {
        type: INTEGER,
        allowNull: false
      },
      roleId: {
        type: INTEGER,
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
    return queryInterface.dropTable('userRole')
  }
};
