// 引入模块
const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require("koa-router");
const render = require('koa-ejs');
const path = require("path");
const bodyparser = require('koa-bodyparser');

// 实例化
const app = new Koa();
const router = new KoaRouter();

// 自定义添加context属性
app.context.user = "Summer";

// 替代数据库
const things = ['读书', '制作课程', '看电影', '听音乐']

// json 中间件
app.use(json());
// 搭建服务器
// app.use(async ctx => (ctx.body = {msg: "欢迎到来米修在线！"}));

// body parser
app.use(bodyparser());

// ejs模版引擎
render(app, {
    root:path.join(__dirname, "views"),
    layout:'layout',
    viewExt:'html',
    cache:false,
    debug:false
})

// routers
router.get('/', index);
router.get('/add', showadd);
router.post('/add', add);

// 列表index
async function index(ctx){
    await ctx.render('index',{
        title:'Things I Love:',
        things:things
    })
}

// 添加页面 showadd
async function showadd(ctx){
    await ctx.render('add');
}
// 添加事项 add
async function add(ctx){
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}

// index
// router.get('/', async ctx => {
//     await ctx.render('index',{
//         title:'Things I Love:',
//         things:things
//     })
// })

// router中间件
app.use(router.routes()).use(router.allowedMethods());
router.get("/test", ctx => (ctx.body = `欢迎${ctx.user}`));
router.get("/test2/:name", ctx => (ctx.body = `欢迎${ctx.params.name}`));


// 监听端口
app.listen(4000, ()=> console.log("服务器已经运行..."))