'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app
  const prefix = '/api/v1'
  
  // passport github
  app.passport.mount('github')
  // router.get('/', controller.home.demo)
  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/404'
  })
  app.router.post('/passport/local', localStrategy)

  // middleware 校验中间件
  const roleCheck = app.middleware.roleCheck()

  // api
  require('./router/user')(app)               // 用户相关api
  require('./router/live')(app)               // 直播相关api
  require('./router/role')(app)               // 权限相关api
  router.post('/psupload', controller.upload.postmanUpload)  // 文件上传 
  router.post('/ai', app.jwt, controller.ai.chat)            // ai聊天
  
  // socket.io
  io.of('/').route('new message', io.controller.chat.newMessage)  // 新消息通道
  io.of('/').route('old message', io.controller.chat.oldMessage)  // 历史消息通道
}
