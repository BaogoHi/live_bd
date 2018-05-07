'use strict'

module.exports = app => {
  const {INTEGER, STRING, DATE} = app.Sequelize

  const Live = app.model.define('live', {
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
    tags: {
      type: STRING,
      allowNull: true
    },
    active: {
      type: INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'live',
    underscored: false
  })
  Live.associate = function() {
    app.model.Live.belongsTo(app.model.User, { as: 'user', foreignKey: 'userId'})
  }
  return Live
}