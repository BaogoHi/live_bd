'use strict'

module.exports = app => {
  return async function(ctx, next) {
    await next()
    const info = ctx.app.verifyToken(ctx)
    if(info.role !== 'admin') {
      ctx.helper.fail({ctx, res:'权限不够'})
    }
  }
}