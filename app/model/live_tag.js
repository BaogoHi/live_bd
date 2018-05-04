'use strict'
module.exports = app => {
  const {INTEGER,STRING} = app.Sequelize
  const LiveTag = app.model.define('liveTag', {
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
  }, {
    timestamps: false,
    tableName: 'liveTag'
  })

  return LiveTag
}