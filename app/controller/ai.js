'use strict'

const Controller = require('egg').Controller

class AiController extends Controller {
  /**
   * 聊天
   */
  async chat() {
    const {ctx,app} = this
    const {username} = app.verifyToken(ctx)
    const data = ctx.request.body.question
    console.log(data)
    // 请求接口
    const answer = await ctx.curl(`http://api.ruyi.ai/v1/message`, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: {
        app_key: app.config.aiKey,
        user_id: username,
        q: data
      }
    })
    ctx.body = answer.data.result.intents[0].result.text
  }
}

module.exports = AiController
