'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const {INTEGER, STRING, DATE} = Sequelize
    return queryInterface.createTable('live',{
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      roomname: {
        type: STRING,
        unique: true,
        allowNull: false,
      },
      userId:{
        type: INTEGER,
        unique: true,
        allowNull: false,
      },
      gift: {
        type: INTEGER,
        allowNull: true,
      },
      peonum: {
        type: INTEGER,
        allowNull: true,
      },
      livecode: {
        type: STRING,
        allowNull: false,
      },
      liveurl: {
        type: STRING,
        allowNull: true,
      },
      usecustom: {
        type: INTEGER,
        allowNull: false
      },
      active: {
        type: INTEGER,
        allowNull: true
      },
      createdAt: DATE,
      updatedAt: DATE
    })
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.dropTable('live')
  }
};
