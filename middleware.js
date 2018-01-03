//   ctx 作为上下文使用，包含了基本的 ctx.request 和 ctx.response。另外，还对 Koa 内部对一些常用的属性或者方法做了代理操作，
// 使得我们可以直接通过 ctx 获取。比如，ctx.request.url 可以写成 ctx.url。

// next 参数的作用是将处理的控制权转交给下一个中间件，而 next() 后面的代码，将会在下一个中间件及后面的中间件（如果有的话）执行结束后再执行。

// 注意： 中间件的顺序很重要！


const Koa = require('koa');
const app = new Koa();

// 记录执行的时间 
app.use(async (ctx, next) => {
  let stime = new Date().getTime();
  await next();
  let etime = new Date().getTime();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>hello world</h1>';
  console.log(`请求地址: ${ctx.path}，响应时间：${etime - stime}ms`);
})

app.use(async (ctx, next) => {
  console.log('中间件1 dosomething');
  await next();
  console.log('中间件1 end');
})

app.use(async (ctx, next) => {
  console.log('中间件2 dosomething');
  await next();
  console.log('中间件2 end');
})

app.use(async (ctx, next) => {
  console.log('中间件3 dosomething');
  await next();
  console.log('中间件3 end');
})

app.listen(3000, () => {
  console.log(`Server is starting at port 3000!`);
})


// Server is starting at port 3000!
// 中间件1 dosomething
// 中间件2 dosomething
// 中间件3 dosomething
// 中间件3 end
// 中间件2 end
// 中间件1 end
// 请求地址: /，响应时间：4ms

// 如果一个中间件没有调用 await next() ， 那后面的中间件就不会执行了