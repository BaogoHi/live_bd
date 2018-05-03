'use strict';

const Service = require('egg').Service;

class LiveService extends Service {
  /**
   * 创建直播间
   * @param {*} live 
   */
  async create(live) {
    return this.ctx.model.Live.create(live)
  }
  /**
   * 添加礼物
   * @param {*} livecode 
   */
  async addGift(livecode) {
    const {app}  = this
    const giftnum = await this.ctx.model.query(`UPDATE live SET gift=gift+1 WHERE livecode='${livecode}'`)
    return giftnum
  }
  /**
   * 通过livecode查找直播间
   * @param {*} livecode 
   */
  async findByCode(livecode) {
    const live = await this.ctx.model.Live.findOne({where: livecode})
    if(!live) {
      this.ctx.throw(404, '直播间没有找到')
    }
    return live
  }
  /**
   * 更新直播间信息
   * @param {*} value 
   * @param {*} livecode 
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
   * @param {*} limit 
   * @param {*} offset 
   */
  async findAllLive(limit=10, offset=0) {
    const live = await this.ctx.model.Live.findAll({limit:parseInt(limit), offset:parseInt(offset)})
    if(!live) {
      this.ctx.throw(404, 'there has no data')
    }
    return live
  }
  /**
   * 根据livecode删除直播间
   * @param {*} livecode 
   */
  async deleteByCode(livecode) {
    return await this.ctx.model.Live.destroy({where: {livecode}})
  }
}

module.exports = LiveService;
