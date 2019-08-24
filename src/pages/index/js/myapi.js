import axios from 'axios'
// import Vue from 'vue';
const baseURL = process.env.baseURL || "/api";
console.log(process.env.baseURL);

// 请求对象实例，具体的方法
const create = function() {
    let http = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    // 请求拦截器
    http.interceptors.request.use(config => {
        // debugger;
        // if (config.method === 'post') {
        //     config.data = JSON.stringify(config.data)
        // }
        // const token = localStorage.getItem('token');
        // if(token){
        //     config.headers = {
        //         cookie: `token=${token}`
        //     }
        // }

        return config
    }, error => {
        return Promise.reject(error)
    })

    // 响应拦截器
    http.interceptors.response.use(response => {
        // debugger;
        // 响应状态统一处理
        return response;
        // if (response.data.retCode == 200) {
        //     return response;
        // } else if (response.data.retCode == -200) {
        //     window.location.replace('/sangjie/panel/login');
        //     // Vue.prototype.$router.replace('/login');
        // }
    }, error => {
        return Promise.reject(error)
    })

    return http
}
const instance = create();

// 柯理化

// const ['get', 'post'] = ['get', 'post'].map(item => {
//     return (url) => {
//         return (data) => {
//             return (config) => {
//                 instance[item](url, data, config);
//             }
//         };
//     };
// });
const get = (url) => {
    return (data) => {
        return (config) => {
            return instance.get(url, data, config);
        }
    }
};
const post = (url) => {
    return (data) => {
        return (config) => {
            return instance.post(url, data, config);
        }
    }
};

// 接口map 表
const apis = {
    //商户后台登录的接口
    login: post('/merchant/login'),
    cancellation: get('/merchant/cancellation'),
    //查询商家个人基本信息
    merchantChange: get("/merchant/order/findByMerchantidDetail"),
    //修改商家个人信息
    updataByMer: post("/archives/updateByMerchant"),
    //查询所有商户
    FindByAdminAll: get('/archives/findByAdminAll'),
    //查询所有商户财务
    findByTotal: get('/archives/findByTotal'),
    //查询用户退款信息
    findRefund: get('/merchant/order/findByMerchantidRefund'),
    //注册送好礼接口
    network: post('/archives/network'),
    //给用户添加优惠券
    addShRed: post('/shop/addRed'),
    //修改商家logo
    updateLogo: post('/archives/updateByMerchantAndLogo'),
    //修改商家归属
    updateRemark: post('/archives/updateByMerchantAndRemark'),
    //商品接口
    myshop: get('/commodity/all'), //查询所有商品
    addshop: post('/commodity/addCommodity'), //添加商品
    delshop: post('/commodity/deleteByCommodityid'), //删除商品
    upshop: post('/commodity/updateByCommodityid'), //修改商品
    // 耗材添加商品规格
    addStandards: post('/type/addStandards'),
    //耗材修改商品规格
    updateByStandards: post('/type/updateByStandards'),
    //耗材删除商品规格
    deleteStand: post('/type/deleteByStandards'),
    queryActivity: get('/activity/findByActivityAll'), //查询某个商品的所有活动
    //添加产品的图片
    addByType: post("/type/addByType"),
    //添加产品类型
    addByTypeOne: post('/type/addByTypeOne'),
    //添加广告的banner
    addBanner: post('/banner/addBanner'),
    //查询所有的banner
    allBanner: get('/banner/all'),
    //删除所有banner
    deleBanner: get('/banner/deleteBanner'),
    //添加公告
    addNotice: post('/notice/addNotice'),
    //删除公告
    delNotice: get('/notice/delNotice'),
    //查询所有公告
    findNotice: get('/notice/findByNoticeAll'),
    //添加反馈
    addFeedback: post('/feedback/addFeedback'),
    //查询反馈
    findFeedback: get('/feedback/findByFeedbackAll'),
    //商品类型
    typeFind: get('/type/findByTypeHigherup'), //根据一级下单栏查询下级
    typeFindOne: get('/type/findByTypeHigherupOne'), //根据一级下单栏查询下级公司后台
    typeStatus: get('/type/findByTypeStatus'), //查询一级下单栏
    typeStatusOne: get('/type/findByTypeStatusOne'), //查询一级下单栏公司后台
    //优惠活动
    discountAll: get('/discount/all'), //查询所有优惠
    discountAddDis: post('/discount/addDiscount'), //新增打折优惠
    discountFull: post('/discount/addDiscountByFull'), //新增满减优惠
    deledDiscount: post('/discount/delteDiscount'), //删除优惠
    updateDiscount: post('/discount/updateDiscount'), //修改优惠
    //查询商家提现
    findRecord: get('/archives/findByRecordListAll'),
    //修改提现状态
    updataRecord: get('/archives/updateRecordId'),
    // 商家认证
    archives: get("/archives/all"), //所有商家认证
    //审核通过或不通过
    upArchives: post('/archives/updateByArchivesStatus'),
    //修改商家认证信息
    updataByAchivesld: post('/archives/updateByArchivesId'),
    //boss圈查询所有帖子
    queryAll: get("/archives/findByMessageAll"),

    //删除boss圈对应帖子
    deleteStatus: get("/archives/updateMessageStatus"),
    //搜索boss圈对应的帖子
    messageAll: get("/archives/findByMessageAll"),
    //订单查询
    orderAll: get("/merchant/order/all"),
    //修改订单
    orderType: get("/merchant/order/updateByOrderType"),
    //意见
    proposalAll: get('/proposal/all'), //所有意见和建议
    proposalAdd: post('/proposal/insertProposal'), //添加意见
    updataProposal: get('/proposal/updateByMerchant'), //修改意见信息
    //查询所有wechat认证店铺
    findAll: get('/shop/findByAll'),
    //添加优惠卷
    addRed: post('/shop/addRed'),
    //重新发起订单
    orderCallback: post('/orderCallback'),
    //查询优质商家
    findChantType: get('/archives/findByMerchantType'),
    //设置优质商家
    updateChantType: post('/archives/updateMerchantByType'),
    //查询所有期数
    findByPageNum: get('/htmlRed/findByPageNum'),
    //添加活动期数
    findByPageMoney: post('/htmlRed/findByPageNum'),
    //根据期数查询所有活动
    findByAllShare: get('/share/findByPageNum'),
    //关闭活动
    updateRedOpen: get('/htmlRed/updateByHtmlRedOpen'),
    //结算当前活动
    closeRedId: get('/htmlRed/findByHtmlRedId'),
    //添加礼品卡
    addCodeModel: get('/code/addCodeModel'),
    //查询所有礼品卡
    queryCodeModel: get('/code/all'),
}
const request = function(name, data, config) {
    return apis[name](data)(config);
}
export default request;