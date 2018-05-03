'use strict';

const Service = require('egg').Service;

class LiveService extends Service {
  async create(live) {
    return this.ctx.model.Live.create(live)
  }
}

module.exports = LiveService;
