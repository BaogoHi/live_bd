'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {INTEGER, STRING} = Sequelize
    return queryInterface.createTable('liveTag', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true
      },
      tagId: {
        type: INTEGER,
        allowNull: false
      },
      liveId: {
        type: INTEGER,
        allowNull: false
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('liveTag')
  }
};
