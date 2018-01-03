
const HomeService = require('../service/home');

module.exports = {
  index: (ctx, next) => {
    ctx.body = '<h1>hello world</h1>'
  },
  home: (ctx, next) => {
    let {querystring, query} = ctx;
    ctx.body = {
      querystring,
      query
    };
  },
  homeParams: (ctx, next) => {
    let {name, age} = ctx.params;
    ctx.body = {
      name,
      age
    };
  },
  login: (ctx, next) => {
    ctx.body = `
      <form action="/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/> 
        <button>GoGoGo</button>
      </form>
    `
  },
  register: async (ctx, next) => {
    console.log(ctx.request.body)
    let {name, password} = ctx.request.body;
    let data = await HomeService.register(name, password);
    ctx.body = data;
  }
}