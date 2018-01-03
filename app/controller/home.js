
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
  login: async (ctx, next) => {
    await ctx.render('home/login',{
      btnName: 'GoGoGo'
    })
  },
  register: async (ctx, next) => {
    console.log(ctx.request.body)
    let {name, password} = ctx.request.body;
    let data = await HomeService.register(name, password);
    ctx.body = data;
  }
}