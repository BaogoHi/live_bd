'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  /**
   * 接收信息,并推送
   */
  async newMessage() {
    const {ctx, app} = this
    const {socket, logger} = ctx
    const nsp = app.io.of('/')
    let {room, username} = socket.handshake.query
    const message = ctx.args[0] || {}
    logger.info(`new message `,message)
    try {
      let data = {
        message: message.data,
        username: username,
        time: message.time
      }
      nsp.to(room).emit('new message', data)
      app.redis.lpush('message', JSON.stringify(data))
      app.redis.expire('message', 10*60)
    } catch (error) {
      logger.error(error)
    }
  }
  /**
   * redis 中查询历史数据，并推送
   */
  async oldMessage() {
    const {ctx, app} = this
    const {socket, logger} = ctx
    const nsp = app.io.of('/')
    let {room} = socket.handshake.query
    const result = await app.redis.lrange('message', 0, 10)
    if(result.length>0) { 
      nsp.to(room).emit('old message', result)
    }else {}
  }
}

module.exports = ChatController;
