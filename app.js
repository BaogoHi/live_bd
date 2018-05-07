module.exports = app => {
  if(app.config.env === 'local') {
    app.beforeStart(async () => {
      // await app.model.sync({force:true})
    })
  }
  // local passport 处理
  const localHandler = async (ctx, user) => {
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    }, user)
    const {password, username} = user
    const result = await ctx.service.user.findByUsername(username)
    const compare = ctx.helper.bcompare(password, result.password)
    console.log(compare)
    if(compare) {
      return app.getUserJson(result, ctx, 1)
    } else {
      return ctx.helper.fail({ctx,res: '用户名或者密码错误'})
    }
    
  }
  // github passport 处理
  const githubHandler = async (ctx, userinfo) => {
    const user = userinfo.profile
    const newUser = {
      username: user.username,
      provider:'github',
      email:user._json.email|| 'null@email.com',
      password: userinfo.accessToken,
      livecode:`github_`+user.username,
      avatar: user.photos[0].value
    }
    const result = await ctx.service.user.create(newUser)
    console.log(result)
    ctx.service.live.create({
      roomname: result.username,
      livecode: result.livecode,
      userId: result.id,
      gift: 0,
      peonum: 0,
      liveurl: `/`+result.livecode,
      usecustom: 0,
      active: 1
    })
    return ctx.helper.success({
      ctx,
      res: 'github登录成功'
    })
  }
  // passport 综合处理
  app.passport.verify(async (ctx, user) => {
    // 根据provider不同，来选择处理函数
    const provider = user.provider
    const handler = provider === 'github'? githubHandler : localHandler
    return handler( ctx, user )
  })
}
