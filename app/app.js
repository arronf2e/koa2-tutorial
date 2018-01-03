const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

router(app);

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
})