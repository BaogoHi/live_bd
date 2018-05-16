'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {ctx} = this
    if(ctx.isAuthenticated) {
      ctx.body = {
        user: ctx.user
      }
    } else {
      ctx.body = {
        user: 'fail'
      }
    }
  }
  async demo() {
    const {ctx} = this
    const data = {name:'egg'}
    ctx.body = await this.ctx.renderString('hi, {{name}}', data)
    // ctx.render('index.html')
  }
}

module.exports = HomeController;
