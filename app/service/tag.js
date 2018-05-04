'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  /**
   * 创建tag
   * @param {*} tag 
   */
  async create(tag) {
    return await this.ctx.model.Tag.create(tag)
  }
  /**
   * 查询所有tag
   * @param {*} limit 
   * @param {*} offset 
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
   * @param {*} id 
   */
  async deleteTagById(id) {
    const tag = await this.ctx.model.Tag.destroy({where: {id}})
    return tag
  }
}

module.exports = TagService;
