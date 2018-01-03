const path = require('path');
const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const bodyParser = require('koa-bodyparser');

// 模板引擎
const nunjucks = require('koa-nunjucks-2');

// 引入 koa-static 处理
const staticFiles = require('koa-static');

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./public")));

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),// 指定视图目录
  nunjucksConfig: {
    trimBlocks: true // 开启转义 防Xss
  }
}))

app.use(bodyParser());

router(app);

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
})