'use strict'

module.exports = {
  generateJWT(id, username, livecode) {
    const { config } = this
    const token = this.jwt.sign({ id, username, livecode }, config.jwt.secret)
    return token
  },
  verifyToken(ctx) {
    const {config} = this
    const token = config.jwt.getToken(ctx)
    if(!token) return null
    return this.jwt.verify(token, config.jwt.secret)
  },
  getUserJson(user, ctx, check) {
    user = user.get()
    const {config} = this
    let token = config.jwt.getToken(ctx)
    if(!token) {
      token = 'Bearer ' + this.generateJWT(user.id, user.username, user.username)
    }
    if(check === 1){
      return {token}
    } else if(check === 0) {
      return {
        username: user.username,
        email: user.email
      }
    } else {
      return {error:'联系管理员吧'}
    } 
  }
}