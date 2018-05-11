'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} user 
   */
  async create(user) {
    return await this.ctx.model.User.create(user)
  }
  /**
   * 通过邮箱查找用户
   * @param {*} email 
   */
  async findByEmail(email) {
    const user = await this.ctx.model.User.findOne({where: {email}})
    if(!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user
  }
  /**
   * 通过用户名查找用户
   * @param {*} username 
   */
  async findByUsername(username) {
    const user = await this.ctx.model.User.findOne({
      where: {username},
      include: {
        model: this.ctx.model.UserRole,
        attributes: ['roleId'],
        include: {
          model: this.ctx.model.Role,
          as: 'role',
          attributes:['name']
        }
      }
    })
    if(!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user
  }
  /**
   * 通过id查找用户
   * @param {*} id 
   */
  async findById(id) {
    const {ctx} = this
    const user = await ctx.model.User.findOne({
      where: {id},
      include: {
        model: this.ctx.model.UserRole,
        attributes: ['roleId'],
        include:{
          model: this.ctx.model.Role,
          as: 'role',
          attributes:['name'],
        }
      }
    })
    if(!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user
  }
  /**
   * 给用户加权限
   * @param {*} id 
   * @param {*} name 
   */
  async addRole(id, name) {
    if(name&&id) {
      const result = await this.ctx.service.role.create({
        name: name
      })
      return await this.ctx.model.query('INSERT INTO userRole (userId, roleId) VALUES (id, result.id)')
    } else {
      return
    }
  }
  /**
   * 更新用户信息
   * @param {*} values 
   * @param {*} id 
   */
  async update(values, id) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user.update(values)
  }
  /**
   * 通过id删除用户
   * @param {*} id 
   */
  async deleteById(id) {
    // console.log(id)
    const user = await this.ctx.model.User.destroy({where: {id}}) 
    if(!user) {
      this.ctx.throw(404, '没有此用户')
    } 
    else if(user) {
      return '用户删除成功'
    } else {
      return '请联系管理员！'
    }
    
  }
  /**
   * 查看所有用户信息
   * @param {*} limit 
   * @param {*} offset 
   */
  async findAllUser(limit=10, offset=0) {
    const user = await this.ctx.model.User.findAll({
      limit:parseInt(limit),
      offset:parseInt(offset),
      include:{
        model: this.ctx.model.Live,
      }
    })
    if(!user) {
      this.ctx.throw(404, 'there has no data')
    }
    return user
  }
  /**
   * 添加用户和权限的关联
   */
  async addRole(uid, rid) {
    const {ctx} = this
    const role = await ctx.model.UserRole.create({
      userId: uid,
      roleId: rid
    })
    return role
  }
}

module.exports = UserService;
