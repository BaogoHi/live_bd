'use strict'
module.exports = app => {
  const {STRING} = app.Sequelize
  const Role = app.model.define('role', {
    name: {
      type: STRING,
      unique: true,
      allowNull: false
    }
  },{
    timestamps: true, 
    tableName: 'role',
    underscored: false
  })
  Role.associate = function() {
    app.model.Role.hasMany(app.model.UserRole)
  }
  return Role
}