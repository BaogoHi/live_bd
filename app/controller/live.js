'use strict';

const Controller = require('egg').Controller;

class LiveController extends Controller {
  /**
   * 添加礼物
   */
  async addGifts() {
    const {ctx, app} = this
    const {livecode} = app.verifyToken(ctx)
    const gift = await ctx.service.live.addGift(livecode)
    if(gift.length> 0){
      ctx.body = {
        body: gift
      }
    } else {
      ctx.body = {
        error:'请联系管理员！'
      }
    }
  }
  /**
   * 更新直播间信息
   */
  async updateLive() {
    const {ctx, app} = this
    const {livecode} = app.verifyToken(ctx)
    const value = ctx.request.body
    const live = await ctx.service.live.updateLive(value, livecode)
    if(live){
      ctx.body = {
        body: '更新成功'
      }
    }
  }
}

module.exports = LiveController;
