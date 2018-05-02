'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525238603482_4373';

  // add your config here
  // 中间件要转化成驼峰
  config.middleware = ['errorHandler', 'notfoundHandler']
  // jwt 配置
  config.jwt = {
    secret: '123456',
    getToken(ctx) {
      if(
        ctx.headers.authorization &&
        (ctx.headers.authorization.split(' ')[0] === 'Bearer' ||
        ctx.headers.authorization.split(' ')[0] === 'Token')
      ) {
        return ctx.headers.authorization.split(' ')[1]
      } else if (ctx.query && ctx.query.token) {
        return ctx.query.token
      }
      return null
    }
  }
  // sequelize 配置
  exports.sequelize = {
    dialect: 'mysql',
    database: process.env.DB_DATABASE || 'zb',
    host: process.env.DB_HOST || '119.28.84.27',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'klren0312',
    timezone: '+08:00'
  }
  // csrf关闭
  config.security = {
    csrf: {
      enable: false
    }
  }
  // cors配置
  exports.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  return config;
};
