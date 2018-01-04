const miSend = require('./mi-send');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
// 引入日志中间件
const miLog = require('./mi-log');
module.exports = (app) => {

  app.use(miLog());

  // 指定 public目录为静态资源目录，用来存放 js css images 等
  app.use(staticFiles(path.resolve(__dirname, "../public")));

  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),// 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义 防Xss
    }
  }))

  app.use(bodyParser());
  app.use(miSend())
}