'use strict'

const Controller = require('egg').Controller

class TagController extends Controller {
  /**
   * 查询所有的标签
   */
  async findAllTags() {
    const {ctx} = this
    const tags = await ctx.service.tag.findAllTags()
    ctx.helper.success({ctx, res: tags})
  }

  /**
   * 创建标签
   */
  async createTag() {
    const {ctx} = this
    const {name} = ctx.request.body
    const result = await ctx.service.tag.create({name})
    ctx.helper.success({ctx, res:result})
  }

  /**
   * 删除标签
   */
  async deleteTagById() {
    const { ctx } = this
    const { id } = ctx.params
    const result = await ctx.service.tag.deleteTagById(id)
    if(parseInt(result) === 1){
      ctx.helper.success({ctx, res:result})
    } else {
      ctx.helper.fail({ctx, res: result})
    }
  }
  
  /**
   * 更新tag
   */
  async updateTag() {
    const {ctx} = this
    const {id, data}  = ctx.request.body
    const result = await ctx.service.tag.updateTagById(data, id)
    ctx.helper.success({ctx, res: result})
  }
}

module.exports = TagController
