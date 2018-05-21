'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525238603482_4373';

  // add your config here
  // AI apikey 连接地址：https://ruyi.ai/
  config.aiKey = '58001567- - - - '
  // 中间件要转化成驼峰
  config.middleware = ['errorHandler', 'notfoundHandler']
  // view 配置
  config.view = {
    defaultViewEngine: 'nunjucks'
  }
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
  config.sequelize = {
    dialect: 'mysql',
    database: process.env.DB_DATABASE || 'zb',
    host: process.env.DB_HOST || ' ',
    // host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USER || 'root',
    // password: process.env.DB_PASSWORD || 'root',
    password: process.env.DB_PASSWORD || ' ',
    timezone: '+08:00'
  }
  // csrf关闭
  config.security = {
    csrf: {
      enable: false
    },
    methodnoallow: {
      enable: false
    },  
  }
  // cors配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  // redis 配置
  config.redis = {
    client: {
      port: process.env.RS_PORT || 6379,
      host: process.env.RS_HOST || '0.0.0.0',
      password: process.env.RS_PASSWORD || '',
      db: 0,
    }
  }
  // socket.io
  config.io = {
    init: {
      wsEngine: 'uws'
    },
    namespace: {
      '/': {
        connectionMiddleware: ['connection']
      }
    },
    redis: {
      host: process.env.RS_HOST || '0.0.0.0',
      port: process.env.RS_PORT || 6379
    }
  }
  // passport github
  config.passportGithub = {
    key: 'a340ee0c3ae5d56f94db',
    secret:'b9fef257ea93259f83fbb294f57b3219b1dc45e8',
    callbackURL: '/passport/github/callback'
  }
  // passport local 
  config.passportLocal = {
  }

  // email
  config.transporter= {
    appName: '治娱直播',
    host: 'smtp.139.com',
    secure: true,
    port: 465,
    auth: {
      user: ' @139.com',
      pass: ' '
    }
  }

  return config;
};
