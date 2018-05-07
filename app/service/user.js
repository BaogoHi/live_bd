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
    const User = await this.ctx.model.User.findOne({where: {email}})
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
    const user = await this.ctx.model.User.findOne({where:{username}})
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
      // include: [{
      //   model: this.ctx.model.Live,
      //   as: 'userlive'
      // }]
    })
    if(!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user
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
    console.log(id)
    const user = await this.ctx.model.User.destroy({where: {id}})
    console.log(user)  
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
  
}

module.exports = UserService;
