'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const {INTEGER, STRING} = Sequelize
    return queryInterface.createTable('liveTag', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      tagId: {
        type: INTEGER,
        unique: true,
        allowNull: false
      },
      livecode: {
        type: STRING,
        unique: true,
        allowNull: false
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('liveTag')
  }
};
