'use strict'

module.exports = app => {
  const {INTEGER} = app.Sequelize

  const UserRole = app.model.define('userRole', {
    userId: {
      type: INTEGER,
      allowNull: false
    },
    roleId: {
      type: INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'userRole',
    underscore: false
  })

  UserRole.associate = function() {
    app.model.UserRole.belongsTo(app.model.Role, { as:'role', foreignKey:'roleId'})
  }
  
  return UserRole
}