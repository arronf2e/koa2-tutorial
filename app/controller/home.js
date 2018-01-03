
const HomeService = require('../service/home');

module.exports = {
  index: async (ctx, next) => {
    await ctx.render("home/index", {title: "iKcamp欢迎您"})
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
    let res = await HomeService.register(name, password);
    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  }
}