'use strict'

module.exports = app => {
  const {STRING,INTEGER,BOOLEAN,DATE} = app.Sequelize
  
  const Admin = app.model.define('admin', {
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
    phone: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    image_id:{
      type: INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'admin',
    underscored:false
  })

 
  
  return Admin
}