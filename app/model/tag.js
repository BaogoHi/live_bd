'use strict'
module.exports = app => {
  const {STRING, DATE} = app.Sequelize
  const Tag = app.model.define('tag', {
    name: {
      type: STRING,
      unique: true,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'tag',
    undersocred: false
  })
  return Tag
}