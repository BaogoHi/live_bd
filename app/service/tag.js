'use strict'

const Service = require('egg').Service

class TagService extends Service {
  /**
   * 创建tag
   * @param {Object} tag 标签信息
   * @return {Object} 标签信息
   */
  async create(tag) {
    return await this.ctx.model.Tag.create(tag)
  }

  /**
   * 通过id查找tag
   * @param {Int} id 标签id
   * @return {Object} 标签信息
   */
  async findTagById(id) {
    return await this.ctx.model.Tag.findOne({where: id})
  }

  /**
   * 查询所有tag
   * @param {Int} limit 页面最大数据
   * @param {Int} offset 数据起始位
   * @return {Array} tags 所有标签
   */
  async findAllTags(limit=10, offset=0) {
    const tags = await this.ctx.model.Tag.findAll({limit:parseInt(limit), offset:parseInt(offset)})
    if(!tags) {
      this.ctx.throw(404, 'there has no data')
    }
    return tags
  }

  /**
   * 通过id删除tag
   * @param {Int} id 标签id
   * @return {Object} 删除结果
   */
  async deleteTagById(id) {
    const tag = await this.ctx.model.Tag.destroy({where: {id}})
    return tag
  }

  /**
   * 通过id更新tag信息
   * @param {Object} value 
   * @param {Int} id 标签id
   * @return {Object} 更新结果
   */
  async updateTagById(value, id) {
    console.log(id)
    const tag = await this.ctx.service.tag.findTagById(id)
    if(!tag) {
      this.ctx.throw(404, 'there has no data')
    }
    return await tag.update(value)
  }
}

module.exports = TagService
