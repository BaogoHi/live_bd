'use strict'

module.exports = {
  generateJWT(id, username, livecode, role) {
    const { config } = this
    const token = this.jwt.sign({ id, username, livecode, role }, config.jwt.secret)
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
    if(check === 1){
      if(!token) {
        token = 'Bearer ' + this.generateJWT(user.id, user.username, user.username, user.userRoles[0].role.name||'')
      }
      return {
        token,
        roles: user.userRoles
      }
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