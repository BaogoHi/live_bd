'use strict'

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next()
    if (ctx.status === 404 && !ctx.body) {
      ctx.helper.fail({ ctx, code: 404, res:'not found'})
    }
  }
}