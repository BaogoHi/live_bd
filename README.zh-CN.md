# live_bd



## 快速入门

<!-- 在此次添加使用文档 -->
### 使用插件
 
 - "bcryptjs": "^2.4.3",
 - "egg-jwt": "^3.0.0",
 - "egg-sequelize": "^3.1.3",
 - "egg-validate": "^1.0.0",
 - "mysql2": "^1.5.3",
 - "egg-redis": "^2.0.0",
 - "egg-socket.io": "^4.0.8",
 - "uws": "^9.148.0"

### 功能

 1. 用户注册登录
 2. 直播间
 3. 聊天室


如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org
