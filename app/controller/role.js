'use strict'

const Controller = require('egg').Controller

class RoleController extends Controller {
  /**
   * 创建权限
   */
  async createRole() {
    const {ctx} = this
    const {role} = ctx.request.body
    const result = await ctx.service.role.create(role)
    ctx.helper.success({ctx, res:result})
  }
  
  /**
   * 删除权限
   */
  async deleteRole() {
    const {ctx} = this
    const {id} = ctx.params
    console.log(id)
    const result = await ctx.service.role.deleteById(id)
    ctx.helper.success({ctx, res:result})
  }
}

module.exports = RoleController
