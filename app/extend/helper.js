'use strict'

const bcrypt = require('bcryptjs')

// 加密
exports.bhash = str => {
  return bcrypt.hashSync(str, 10)
}
// 比对
exports.bcompare = (str, hash) => {
  return bcrypt.compareSync(str, hash)
}

// 处理成功请求后的响应
exports.success = ({ctx, res = null, msg = 'success'}) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
}

//处理错误相关的响应
exports.fail = ({ctx, res = null, msg= 'fail'}) => {
  ctx.body = {
    code: -1,
    data: res,
    msg
  }
}