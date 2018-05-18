'use strict'

const Controller = require('egg').Controller

const fs = require('fs')
const path = require('path')
const awaitStream = require('await-stream-ready')
const sendToWormhole = require('stream-wormhole')
const awaitWriteStream = require('await-stream-ready').write

class UploadController extends Controller {
  /**
   * 上传图片
   */
  async upload() {
    const { ctx, app } = this
    const stream = await ctx.getFileStream()
    const resourceDir = app.config.env === 'local' ? 'resource_dev' : 'resource'
    const target = path.join(resourceDir, path.extname(stream.filename))
    ctx.logger.debug('upload file path:', target)
    const writeStream = fs.createWriteStream(target)
    const awaitWriteStream = awaitStream.write
    try {
      await awaitWriteStream(stream.pipe(writeStream))
      ctx.body = { ok: 1 }
    } catch(err) {
      await sendToWormhole(stream)
      throw err
    }
    this.ctx.helper.success({ctx, code:201, res:'上传成功'})
  }

  /**
   * form-data 上传图片
   */
  async postmanUpload() {
    // 获取文件流
    const stream = await this.ctx.getFileStream()
    // 获取文件名
    const filename = stream.filename.toLowerCase()
    // 保存文件到app/public
    const target = path.join(this.config.baseDir, 'app/public', filename)
    // 将流写入文件报错到文件夹
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    this.ctx.helper.success({ctx, code:201, res:'上传成功'})
  }
}

module.exports = UploadController
