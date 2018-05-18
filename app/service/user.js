'use strict'

const Service = require('egg').Service

class UserService extends Service {
  /**
   * 创建用户
   * @param {Object} user 用户信息
   */
  async create(user) {
    return await this.ctx.model.User.create(user)
  }

  /**
   * 通过邮箱查找用户
   * @param {String} email 邮箱
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
   * @param {String} username 用户名
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
   * @param {Int} id 用户id
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
   * @param {Int} id 用户id
   * @param {String} name 用户权限
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
   * @param {Object} values 更新信息
   * @param {Int} id 用户id
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
   * @param {Int} id 用户id
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
   * @param {Int} limit 每页最大数据
   * @param {Int} offset 数据起始位
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
   * @param {Int} uid 用户id
   * @param {Int} rid 权限id
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

module.exports = UserService
