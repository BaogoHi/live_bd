'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  /**
   * 创建权限
   * @param {*} role 
   */
  async create(role) {
    return await this.ctx.model.Role.create(role)
  }
  /**
   * 通过id删除
   * @param {*} id 
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

module.exports = RoleService;
