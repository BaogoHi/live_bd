'use strict'

module.exports = {
  /**
   * 生成Token
   * @param {Int} id 
   * @param {String} username 
   * @param {String} livecode 
   * @param {String} role 
   * @return {String} token 验证字符串
   */
  generateJWT(id, username, livecode, role) {
    const { config } = this
    const token = this.jwt.sign({ id, username, livecode, role }, config.jwt.secret)
    return token
  },

  /**
   * 验证token
   * @param {Object} ctx 
   * @return {Object} jwt解析后的信息
   */
  verifyToken(ctx) {
    const {config} = this
    const token = config.jwt.getToken(ctx)
    if(!token) return null
    return this.jwt.verify(token, config.jwt.secret)
  },

  /**
   * 获取用户信息
   * @param {Object} user 
   * @param {Object} ctx 
   * @param {Int} check 
   * @return {Object} 用户登录/注册反馈
   */
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