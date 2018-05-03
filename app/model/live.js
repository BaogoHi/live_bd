'use strict'

module.exports = app => {
  const {INTEGER, STRING, DATE} = app.Sequelize

  const Live = app.model.define('live', {
    roomname: {
      type: STRING,
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
    }
  }, {
    timestamps: false,
    tableName: 'live',
    underscored: false
  })
  // Live.associate = function() {
  //   app.model.Live.belongsTo(app.model.User, { as: 'owner', foreignKey: 'livecode'})
  // }
  return Live
}