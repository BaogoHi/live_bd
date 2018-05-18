'use strict'

const Service = require('egg').Service

class LiveService extends Service {
  /**
   * 创建直播间
   * @param {Object} live 直播间信息
   */
  async create(live) {
    return this.ctx.model.Live.create(live)
  }

  /**
   * 添加礼物
   * @param {String} livecode 直播码
   */
  async addGift(livecode) {
    const {app}  = this
    const giftnum = await this.ctx.model.query(`UPDATE live SET gift=gift+1 WHERE livecode='${livecode}'`)
    return giftnum
  }

  /**
   * 通过livecode查找直播间
   * @param {String} livecode 直播码
   */
  async findByLive(livecode) {
    const live = await this.ctx.model.Live.findOne({
      where: {livecode},
    })
    if(!live) {
      this.ctx.throws(404, '直播间没找到')
    }
    return live
  }

  /**
   * 通过id查找直播间
   * @param {String} id 直播间id
   */
  async findByCode(id) {
    const live = await this.ctx.model.Live.findOne({
      where: id,
      include: [{
        model: this.ctx.model.User,
        as:'user'
      }, {
        model: this.ctx.model.LiveTag,
        include: {
          model: this.ctx.model.Tag,
          as: 'tag'
        }
      }]
    })
    if(!live) {
      this.ctx.throw(404, '直播间没有找到')
    }
    return live
  }

  /**
   * 更新直播间信息
   * @param {Object} value 更新信息
   * @param {String} livecode 直播码
   */
  async updateLive(value,livecode) {
    const live = await this.ctx.service.live.findByCode({livecode})
    if(!live) {
      this.ctx.throw(404, '直播间没找到')
    }
    return await live.update(value)
  }

  /**
   * 查看所有直播间信息
   * @param {Int} limit 每页最多数据
   * @param {Int} offset 数据起始位
   */
  async findAllLive(limit=10, offset=0) {
    const live = await this.ctx.model.Live.findAll({
      limit:parseInt(limit), 
      offset:parseInt(offset),
      include: [{
        model: this.ctx.model.User,
        as:'user',
        attributes:['username'],
      }, {
        model: this.ctx.model.LiveTag,
        attributes:['tagId'],
        include: {
          model: this.ctx.model.Tag,
          as: 'tag',
          attributes:['name'],
        },
      }]
    })
    if(!live) {
      this.ctx.throw(404, 'there has no data')
    }
    return live
  }

  /**
   * 根据id禁用/解禁直播间
   * @param {Int} id 直播间id
   */
  async banById(id,ban) {
    const result = await this.ctx.service.user.findById(id)
    const livecode = result.livecode
    return await this.ctx.model.Live.update({
      active:ban,
    }, {
      where: {livecode}
    })
  }

  /**
   * 给直播间加标签
   * @param {Int} id 直播间id
   * @param {String} name 直播间名称
   */
  async addTags(id, name) {
    if(name&&id){
      const result = await this.ctx.service.tag.create({
        name: name
      })
      console.log(result.id) 
      return await this.ctx.model.query(`INSERT INTO liveTag ( liveId, tagId ) VALUES (${id}, ${result.id})`)
    } else {
      return 
    }
  }
}

module.exports = LiveService
