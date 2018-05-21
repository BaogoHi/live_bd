'use strict'

module.exports = app => {
  const { router, controller } = app
  const roleCheck = app.middleware.roleCheck()
  const prefix = '/api/v1'
  router.put(prefix + '/gift/:livecode', app.jwt, controller.live.addGifts)                // 添加礼物
  router.put(prefix + '/live', app.jwt, controller.live.updateLive)                        // 更新直播间信息
  router.get(prefix + '/live', app.jwt, controller.live.getAllLive)                        // 获取全部直播间
  router.post(prefix + '/live/tag', app.jwt, controller.live.addTags)                      // 添加房间标签
  router.put(prefix + '/ban/:banId/:ban', app.jwt, roleCheck, controller.live.banLive)     // 禁用/解禁直播间
  router.post(prefix + '/tag', app.jwt,  roleCheck, controller.tag.createTag)              // 创建标签
  router.get(prefix + '/tag', app.jwt, roleCheck, controller.tag.findAllTags)              // 查询所有标签
  router.delete(prefix + '/tag/:id', app.jwt, roleCheck, controller.tag.deleteTagById)     // 根据标签id删除标签 
  router.put(prefix + '/tag', app.jwt, roleCheck, controller.tag.updateTag)                // 根据id更新标签
}