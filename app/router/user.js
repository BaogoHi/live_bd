'use strict'

module.exports = app => {
  const { router, controller } = app
  const roleCheck = app.middleware.roleCheck()
  router.post('/user', controller.user.register)                                  // 注册
  router.post('/user/login', controller.user.login)                               // 登录
  router.get('/user', app.jwt, roleCheck, controller.user.getAllUser)             // 获取全部用户
  router.get('/user/:id', app.jwt, roleCheck, controller.user.getUserById)        // 通过id查询指定用户
  router.put('/user', app.jwt, controller.user.updateUserInfo)                    // 更新用户自己的信息
  router.delete('/user/:id', app.jwt, roleCheck, controller.user.deleteUserById)  // 删除指定用户，除了本用户
  router.post('/user/email', controller.user.sentResetPassCode)                        // 发送重置邮件
  router.post('/user/reset', controller.user.resetPassword)                            // 重置密码
}