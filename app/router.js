'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.post('/register', controller.user.register)                  // 注册
  router.post('/login', controller.user.login)                        // 登录
  router.get('/user', app.jwt, controller.user.getAllUser)            // 获取全部用户
  router.put('/user', app.jwt, controller.user.updateUserInfo)        // 更新用户信息
  router.delete('/user/:id', app.jwt, controller.user.deleteUserById) // 删除指定用户
};
