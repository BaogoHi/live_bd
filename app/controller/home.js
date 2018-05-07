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
}

module.exports = HomeController;
