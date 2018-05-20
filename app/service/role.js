'use strict'

const Service = require('egg').Service

class RoleService extends Service {
  /**
   * 创建权限
   * @param {Object} role  权限信息
   * @return {Object} 权限信息
   */
  async create(role) {
    return await this.ctx.model.Role.create(role)
  }

  /**
   * 通过id删除
   * @param {Int} id 权限id
   * @return {String} 提示语
   */
  async deleteById(id) {
    const role =  await this.ctx.model.Role.destroy({where: {id}})
    if(!role) {
      this.ctx.throw(404, '不存在该权限')
    } 
    else if (role) {
      return '权限删除成功'
    } else {
      return '权限删除失败'
    }
  }
}

module.exports = RoleService
