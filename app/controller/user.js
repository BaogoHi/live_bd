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
    ctx.body = {
      user: app.getUserJson(result, ctx, 1)
    }
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
      livecode: username
    }
    const result = await ctx.service.user.create(newUser)
    ctx.status = 201
    ctx.body = {
      user: app.getUserJson(result, ctx, 0)
    }
  }
  /**
   * 查询所有用户
   */
  async getAllUser() {
    const { ctx, app } = this
    const {limit, offset} = ctx.query
    const result = await ctx.service.user.findAllUser(limit, offset)
    ctx.body = {
      users: result
    }
  }
  /**
   * 更新用户信息
   */
  async updateUserInfo() {
    const {ctx, app} = this
    const {id} = app.verifyToken(ctx)
    const {user} = ctx.request.body
    ctx.body = {
      body: await ctx.service.user.update(user, id)
    }
  }
  /**
   * 根据用户id删除用户
   */
  async deleteUserById() {
    const {ctx, app} = this
    const {id} = app.verifyToken(ctx)
    const delId = ctx.params.id
    if(parseInt(id) === parseInt(delId)) {
      ctx.body = {
        error: '请您不要删除自己'
      }
    } else {
      const result = await ctx.service.user.deleteById(parseInt(delId))
      ctx.body = {
        user:  result
      }
    }
  }
}

module.exports = UserController;
