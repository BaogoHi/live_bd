'use strict';

const Controller = require('egg').Controller

const fs = require('fs')
const path = require('path')
const awaitStream = require('await-stream-ready')
const sendToWormhole = require('stream-wormhole')
const awaitWriteStream = require('await-stream-ready').write

class UploadController extends Controller {
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
  }
  async postmanUpload() {
    const stream = await this.ctx.getFileStream()
    const filename = stream.filename.toLowerCase()
    const target = path.join(this.config.baseDir, 'app/public', filename)
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    this.ctx.redirect('/public/' + filename)
  }
}

module.exports = UploadController;
