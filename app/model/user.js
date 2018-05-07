'use strict'

module.exports = app => {
  const {STRING} = app.Sequelize
  
  const User = app.model.define('user', {
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
    }
  }, {
    timestamps: true,
    tableName: 'user',
    underscored:false
  })
  User.associate = function() {
    app.model.User.hasMany(app.model.Live)
  }
  return User
}