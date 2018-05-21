'use strict'

module.exports = app => {
  const { router, controller } = app
  const roleCheck = app.middleware.roleCheck()
  router.put('/gift/:livecode', app.jwt, controller.live.addGifts)                // 添加礼物
  router.put('/live', app.jwt, controller.live.updateLive)                        // 更新直播间信息
  router.get('/live', app.jwt, controller.live.getAllLive)                        // 获取全部直播间
  router.post('/live/tag', app.jwt, controller.live.addTags)                      // 添加房间标签
  router.put('/ban/:banId/:ban', app.jwt, roleCheck, controller.live.banLive)     // 禁用/解禁直播间
  router.post('/tag', app.jwt,  roleCheck, controller.tag.createTag)              // 创建标签
  router.get('/tag', app.jwt, roleCheck, controller.tag.findAllTags)              // 查询所有标签
  router.delete('/tag/:id', app.jwt, roleCheck, controller.tag.deleteTagById)     // 根据标签id删除标签
  router.put('/tag', app.jwt, roleCheck, controller.tag.updateTag)                // 根据id更新标签
}