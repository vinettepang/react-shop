const Koa = require('koa');
const Router = require('koa-router');
const KoaBody=require('koa-body');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();
const koaBody=new KoaBody();

// 首页 —— 广告（超值特惠）
const homeAdData = require('./home/ad.js');

// 首页 —— 推荐列表（猜你喜欢）
const homeListData = require('./home/list.js');

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
         return "*";
        //return 'http://localhost:8888'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.get('/api/homead', async (ctx) => {
    console.log(ctx)
    console.log(homeAdData)
    ctx.body = homeAdData
});

router.get('/api/homelist/:city/:page', async (ctx) => {
    // 参数
    const params = ctx.params;
    const paramsCity = params.city;
    const paramsPage = params.page;
    console.log('当前城市：' + paramsCity);
    console.log('当前页数：' + paramsPage);
    ctx.body = homeListData;
});

//首页 ---  分类
const categoryListData=require('./home/category');
router.get('/api/category', async (ctx) => {
    const params = ctx.params;
    ctx.body = categoryListData;
});
//首页 - 天气 地址
const headerData = require('./home/header.js');
router.get('/api/home/header', async (ctx) => {
    const params = ctx.params;
    ctx.body = headerData;
});


/*https://restapi.ele.me/shopping/restaurants?latitude=39.90323&longitude=116.39772&offset=20&limit=0&extras[]=activities&terminal=h5*/
//首页 - 食物链接
const goodsData = require('./home/listdata.js');
router.get('/api/getGoodsData/:page', async (ctx) => {
    const params = ctx.params;
    const paramsPage = params.page;
    console.log(paramsPage);
    ctx.body = goodsData[paramsPage];
});

const searchListData=require('./search/list');
//搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', async (ctx) => {
    // 参数
    const params = ctx.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;
    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);
    ctx.body = searchListData;
});


//详情页

//获取商家信息
const infoData=require('./detail/info');
router.get('/api/detail/info/:id', async (ctx) => {
    // 参数
    const params = ctx.params;
    const paramsId = params.id;
    console.log('当前商家id：' + paramsId);
    ctx.body = infoData;
});

//获取评论信息
const comment=require('./detail/comment');
router.get('/api/detail/comment/:page/:id', async (ctx) => {
    // 参数
    const params = ctx.params;
    const paramsId = params.id;
    console.log('当前商家id：' + paramsId);
    ctx.body = comment;
});

//用户订单列表
const orderList = require('./orderlist/orderList.js');
router.get('/api/orderlist/:username',  async (ctx) =>  {
    console.log('订单列表');
    const params = ctx.params;
    const username = params.username;
    console.log('用户名：' + username);

    ctx.body = orderList;
});

//提交评论
router.post('/api/submitComment',koaBody ,async (ctx)=>{
    console.log('提交评论');

    // 获取参数
    console.log(ctx.request.body);

    ctx.body = {
        errno: 0,
        msg: 'ok'
    }
});

//获取所有的初始化收藏内容
router.get('/api/store/getStore/:username',  async (ctx) =>  {
    console.log('收藏内容初始化');

    const params = ctx.params;
    const username = params.username;
    console.log('用户名：' + username);

    ctx.body = [{'id':'1377777'}];
});

//删除收藏内容
router.get('/api/store/removeStore/:item',async (ctx) =>  {
        console.log('删除收藏');

        const params = ctx.params;
        const item = params.item;
        console.log('参数：' + item.id);

        ctx.body = true;
    }
);

//添加收藏内容
router.get('/api/store/addStore/:item',async (ctx) =>  {
        console.log('添加收藏');

        const params = ctx.params;
        const item = params.item;
        console.log('参数：' + item);

        ctx.body = true;
    }
);



//详情页 ---  食物分类
const detailListData=require('./detail/detail-cat');
router.get('/api/detail/detailfoods/:id', async (ctx) => {
    const params = ctx.params;
    ctx.body = detailListData;
});


/*
router.post('/api/post',koaBody,async (ctx) => {
    ctx.body = JSON.stringify(this.request.body);
});

*/



// 开始服务并生成路由
app.use(router.routes(), router.allowedMethods());
app.listen(8008);
