'use strict'

module.exports = app => {
  const {INTEGER} = app.Sequelize
  
  const LiveTag = app.model.define('liveTag', {
    tagId: {
      type: INTEGER,
      allowNull: false
    },
    liveId: {
      type: INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'liveTag',
    underscore: false
  })

  LiveTag.associate = function() {
    // app.model.LiveTag.belongsTo(app.model.Live, { as:'live', foreignKey:'liveId'})
    app.model.LiveTag.belongsTo(app.model.Tag, { as:'tag', foreignKey:'tagId'})
  }

  return LiveTag
}
