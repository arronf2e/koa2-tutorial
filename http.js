const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

router.get('/', (ctx, next) => {
  ctx.body = '<h1>hello world</h1>'
})

router.get('/home', (ctx, next) => {
  let {querystring, query} = ctx;
  ctx.body = {
    querystring,
    query
  };
})

router.get('/home2/:age/:name', (ctx, next) => {
  let {name, age} = ctx.params;
  ctx.body = {
    name,
    age
  };
})

router.get('/user', (ctx, next) => {
  ctx.body = `
    <form action="/user/register" method="post">
      <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
      <br/>
      <input name="password" type="text" placeholder="请输入密码：123456"/>
      <br/> 
      <button>GoGoGo</button>
    </form>
  `
})

router.post('/user/register', (ctx, next) => {
  let {name, password} = ctx.request.body;
  if( name === 'arron' && password === '123456' ){
    ctx.body = `Hello， ${name}！`;
  }else{
    ctx.body = '账号信息错误';
  }
})

router.get('/404', (ctx, next) => {
  ctx.body = '<h1>404 not found</h1>'
})

// 调用路由中间件
app.use(router.routes())

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})


// 1. 请求参数放在 URL 后面

// koa-router 封装的 request 对象，里面的 query 方法或 querystring 方法可以直接获取到 Get 请求的数据，唯一不同的是 query 返回的是对象，而 querystring 返回的是字符串。

// 2. 请求参数放在 URL 中间
// http://localhost:3000/home2/25/arron
// 这种情况下，解析方式肯定与上面的不一样了，koa-router 会把请求参数解析在 params 对象上

// 3. 请求参数放在 body 中
// 当用 post 方式请求时，我们会遇到一个问题：post 请求通常都会通过表单或 JSON 形式发送，而无论是 Node 还是 Koa，都 没有提供 解析 post 请求参数的功能。
// 使用 koa-bodyparser  解析 