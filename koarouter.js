const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = '<h1>hello world</h1>'
})

router.get('/home', (ctx, next) => {
  ctx.body = '<h1>hello home</h1>'
})

router.get('/404', (ctx, next) => {
  ctx.body = '<h1>404 not found</h1>'
})

// 当请求都无法匹配的时候，我们可以跳转到自定义的 404 页面
router.all('/*', async (ctx, next) => {
  ctx.status = 404;
  ctx.body = '<h1>404 Not Found*</h1>';
});


// 调用路由中间件
app.use(router.routes())

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})


// 更多参考  https://github.com/ikcamp/koa2-tutorial/tree/2-koa-router