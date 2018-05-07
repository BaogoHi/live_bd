'use strict';

// had enabled by egg
// exports.static = true;
exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.validate = {
  enable: true,
  package: 'egg-validate'
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

exports.io = {
  enable: true,
  package: 'egg-socket.io'
}

exports.redis = {
  enable: true,
  package: 'egg-redis'
}

exports.passport = {
  enable: true,
  package: 'egg-passport'
}

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github'
}

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local'
}