'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const {INTEGER, STRING, DATE} = Sequelize 
    return queryInterface.createTable('user', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      username: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,50}$/i,
          isLowercase: true,
        }
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          isLowercase: true
        }
      },
      livecode: {
        type: STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,50}$/i,
          isLowercase: true,
        }
      },
      avatar: {
        type: STRING,
        allowNull: true
      },
      createdAt: DATE,
      updatedAt: DATE,
   })
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.dropTable('user')
  }
};
