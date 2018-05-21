'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  /**
   * 用户登录
   */
  async login() {
    const {ctx, app} = this
    const { password, username } = ctx.request.body
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    }, ctx.request.body)
    const result = await ctx.service.user.findByUsername(username)
    if (!ctx.helper.bcompare(password, result.password)) {
      ctx.helper.fail({ctx, res: '用户密码错误'})
      return
    }
    ctx.helper.success({ctx, res: app.getUserJson(result, ctx, 1)})
  }

  /**
   * 用户注册
   */
  async register() {
    const { ctx, app } = this
    const { user } = ctx.request.body
    ctx.validate({
      email: { type: 'email', required: true },
      username: { type: 'string', required: true },
      password: { type: 'string', required: true}
    }, user)
    const {email, username} = user
    const password = ctx.helper.bhash(user.password)
    const newUser = {
      username,
      email,
      password,
      livecode: username,
      provider:'local'
    }
    // 创建用户
    const result = await ctx.service.user.create(newUser)
    const role = await ctx.service.user.addRole(result.id, 2)
    // 创建直播间
    ctx.service.live.create({
      roomname: username,
      livecode: username,
      userId: result.id,
      gift: 0,
      peonum: 0,
      liveurl: `/${username}`,
      usecustom: 0,
      active: 1
    })
    ctx.status = 201
    ctx.helper.success({ctx, res:app.getUserJson(result, ctx, 0)})
  }

  /**
   * 查询所有用户
   */
  async getAllUser() {
    const { ctx, app } = this
    const {limit, offset} = ctx.query
    const result = await ctx.service.user.findAllUser(limit, offset)
    ctx.helper.success({ctx, res:result})
  }

  /**
   * 通过id查询指定用户
   */
  async getUserById() {
    const { ctx, app } = this
    const {id} = ctx.params
    const result = await ctx.service.user.findById(id)
    ctx.helper.success({ctx, res:result})
  }

  /**
   * 更新用户信息
   */
  async updateUserInfo() {
    const {ctx, app} = this
    const {id} = app.verifyToken(ctx)
    const {user} = ctx.request.body
    const result = await ctx.service.user.update(user, id)
    ctx.helper.success({ctx, res:result})
  }

  /**
   * 根据用户id删除用户，并删除对应的livecode的直播间
   */
  async deleteUserById() {
    const {ctx, app} = this
    const {id} = app.verifyToken(ctx)
    const delId = ctx.params.id
    if(parseInt(id) === parseInt(delId)) {
      ctx.helper.fail({ctx, res:'请您不要删除自己'})
    } else {
      const delUser = await ctx.service.user.findById(delId)
      const livecode = delUser.livecode
      // 删除与用户关联的直播间
      ctx.service.live.deleteByCode(livecode)
      const result = await ctx.service.user.deleteById(parseInt(delId))
      ctx.helper.success({ctx, res:result})
    }
  }

  /**
   * 给用户添加权限 
   */
  async addRole() {
    const {ctx, app} = this
    const {id} = app.verifyToken(ctx)
    const {roleId} = ctx.request.body
    const result = await ctx.service.user.addRole(id, roleId)
    ctx.helper.success({ctx, res: result})
  }

  /**
   * 发送重置密码的验证码邮件
   */
  async sentResetPassCode() {
    const {ctx} = this
    const { email } = ctx.request.body
    const user = await ctx.service.user.findByEmail(email)
    if(!user) {
      ctx.helper.fail({ctx, res:'此邮箱未注册！'})
    }
    // 生成缓存key值
    const key = 'password_' + user.id
    // 从缓存中查看用户是否点击过请求邮件
    const hasCode = ctx.service.cache.has(key)
    if (hasCode) {
      ctx.helper.fail({ctx, res:'请勿重复发送'})
    }
    // 生成验证码
    const code = ctx.service.cache.verifyCodeCache(key, 6)
    // 发送重置邮件
    const rs = await ctx.service.email.resetPassword(code, user)
    if (rs && rs.messageId) {
      ctx.helper.success({ctx, res:'验证码发送成功！请注意查收'})
    } else {
      ctx.helper.fail({ctx, res:'发送验证码失败，请重试'})
    }
  }
  
  /**
   * 重置密码
   */
  async resetPassword () {
    const { ctx } = this
    const { email, password, verifyCode } = ctx.request.body
    const user = await ctx.service.user.findByEmail(email)
    if(!user) {
      ctx.helper.fail({ctx, res:'此邮箱未注册！'})
    }
    const key = 'password_' + user.id
    const currentCode = ctx.service.cache.get(key)
    if(currentCode !== verifyCode){
      ctx.logger.info('verifyCode error')
      ctx.helper.fail({ctx, res:'验证码错误'})
    }
    const rs = await ctx.service.user.update({
      password: password
    }, user.id)
    if(!rs) {
      ctx.helper.fail({ctx, res:'修改失败'})
    }
    ctx.service.cache.del(key)
    ctx.helper.success({ctx, res:'修改成功'})
  }
}

module.exports = UserController
