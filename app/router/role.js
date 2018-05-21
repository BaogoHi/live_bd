'use strict'

module.exports = app => {
  const { controller, router } = app
  const roleCheck = app.middleware.roleCheck()
  router.post('/role', app.jwt, roleCheck, controller.role.createRole)            // 创建权限
  router.delete('/role/:id', app.jwt, roleCheck, controller.role.deleteRole)      // 删除权限
  router.post('/user/role', app.jwt, controller.user.addRole)                     // 给用户添加权限
}