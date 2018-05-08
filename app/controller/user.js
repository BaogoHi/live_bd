'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 用户登录
   */
  async login() {
    const {ctx, app} = this
    const { user } = ctx.request.body
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    }, user)
    const {password, username} = user
    const result = await ctx.service.user.findByUsername(username)
    const compare = ctx.helper.bcompare(password, result.password)
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
}

module.exports = UserController;
