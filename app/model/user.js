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
      allowNull: true,
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
        // is: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,50}$/i,
        isLowercase: true,
      }
    },
    provider:{
      type: STRING,
      allowNull: false
    },
    avatar: {
      type: STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'user',
    underscored:false
  })
  User.associate = function() {
    app.model.User.hasMany(app.model.Live)
    app.model.User.hasMany(app.model.UserRole)
  }
  return User
}