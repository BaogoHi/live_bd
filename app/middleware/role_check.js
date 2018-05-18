'use strict'

module.exports = app => {
  return async function(ctx, next) {
    // 此处不能要next() 否则无法拦截请求，虽然get可以拦截
    // 解决方案在https://github.com/eggjs/egg/issues/1695看到的
    // await next() 
    const info = ctx.app.verifyToken(ctx)
    // 检测是否是管理员
    if(info.role !== 'admin') {
      ctx.helper.fail({ctx, code:403, res:'需要管理员权限'})
    }
  }
}