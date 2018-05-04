'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // api
  router.post('/register', controller.user.register)                  // 注册
  router.post('/login', controller.user.login)                        // 登录
  router.get('/user', app.jwt, controller.user.getAllUser)            // 获取全部用户
  router.get('/user/:id', app.jwt, controller.user.getUserById)       // 通过id查询指定用户
  router.put('/user', app.jwt, controller.user.updateUserInfo)        // 更新用户自己的信息
  router.delete('/user/:id', app.jwt, controller.user.deleteUserById) // 删除指定用户，除了本用户
  router.put('/gift/:livecode', app.jwt, controller.live.addGifts)              // 添加礼物
  router.put('/live', app.jwt, controller.live.updateLive)            // 更新直播间信息
  router.get('/live', app.jwt, controller.live.getAllLive)            // 获取全部直播间
  router.post('/live/tag', app.jwt, controller.live.addTags)          // 添加房间标签
  router.put('/ban/:banId/:ban', app.jwt, controller.live.banLive)    // 禁用/解禁直播间
  router.post('/tag', app.jwt, controller.tag.createTag)              // 创建标签
  router.get('/tag', app.jwt, controller.tag.findAllTags)             // 查询所有标签
  router.delete('/tag/:id', app.jwt, controller.tag.deleteTagById)    // 根据标签id删除标签
  router.put('/tag', app.jwt, controller.tag.updateTag)               // 根据id更新标签
  // socket.io
  io.of('/').route('new message', io.controller.chat.newMessage)      // 新消息通道
  io.of('/').route('old message', io.controller.chat.oldMessage)      // 历史消息通道
};
