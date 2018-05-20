'use strict'

module.exports = app => {
  return async (ctx, next) => {
    const nsp = app.io.of('/')
    const {socket,logger} = ctx
    const { room, username } = socket.handshake.query

    socket.join(room)
    logger.info(`new user come on: ${username}, ${room}`)

    // 用户加入
    nsp.adapter.clients([room], (err, clients) => {
      logger.info(clients)
      nsp.to(room).emit('online', {
        clientsNum: clients.length,
        newClient: `欢迎${username}加入房间` 
      })
    })
    
    await next()
    // 用户退出
    nsp.adapter.clients([room], (err, clients) => {
      nsp.to(room).emit('online', {
        clientsNum:clients.length,
        outClient: `${username}退出房间`
      })
    })
  }
}