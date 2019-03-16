// import $ from 'jquery'


// 导入bootstrap 样式
// import './css/index.css'
// import 'bootstrap/dist/css/bootstrap.css'

// 导入mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


import Vue from 'vue'

// 导入VueRouter包
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 导入VueResource包
import VueResource from 'vue-resource'

Vue.use(VueResource);
//全局配置
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 导入Vuex包
import Vuex from 'vuex'

Vue.use(Vuex);


// 导入路由表
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'

// 全局导入MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);

// 导入缩略图插件
import VuePreview from 'vue2-preview'

Vue.use(VuePreview);

// 按需导入mint-ui中的组件
// import {Header, Swipe, SwipeItem, Button } from 'mint-ui'
// 注册
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.component(Lazyload.name, Lazyload);   //Lazyload按需导入报错


// 全局过滤器
import moment from 'moment'

Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern)
});

//获取localStorage中的info数据
var goodsinfo = JSON.parse(localStorage.getItem('info') || '[]');

// 创建store实例
var store = new Vuex.Store({
    state: {
        goodsinfo: goodsinfo,
    },
    mutations: {
        // 加入购物车
        addCar(state, info) {
            var flag = false;

            state.goodsinfo.some(item => {
                if (item.id === info.id) {
                    item.count += info.count;
                    flag = true;
                    return true
                }
            });

            if (!flag) {
                state.goodsinfo.push(info);
            }

            localStorage.setItem('info', JSON.stringify(state.goodsinfo))
        },

        // 增加或减少商品数量
        updateGoodsCount(state, obj) {
            // console.log('updateGoodsCount',obj)
            state.goodsinfo.some(item => {
                if (parseInt(item.id) === obj.id) {
                    item.count = parseInt(obj.count);
                    return true
                }
            });
            localStorage.setItem('info', JSON.stringify(state.goodsinfo))
        },

        //修改商品勾选状态
        updateGoodsSelected(state, obj){
            state.goodsinfo.some(item => {
                if (item.id === obj.id) {
                    console.log('updateGoodsSelected', obj.flag);
                    item.flag = obj.flag;
                    return true
                }
            });
            localStorage.setItem('info', JSON.stringify(state.goodsinfo))
        },

        delGood(state, id){
            state.goodsinfo.some((item, index) =>{
                if (item.id === id) {
                    state.goodsinfo.splice(index, 1);
                    return true;
                }
            });

            localStorage.setItem('info', JSON.stringify(state.goodsinfo))
        }



    },
    getters: {
        // 计算所有商品的数量
        getAllCount(state) {
            var count = 0;
            state.goodsinfo.forEach(item => {
                count += item.count
            });
            return count
        },

        // 单个商品的数量
        getGoodsCount(state) {
            // console.log('getGoodsCount',item.id)
            var obj = {};
            state.goodsinfo.forEach(item => {
                obj[item.id] = item.count
            });
            return obj
        },


        // 计算所有商品的总额和勾选商品的总数
        getGoodsAllPriceAndCount(state) {
            var sum = 0;
            var count = 0;
            state.goodsinfo.forEach(item => {
                if (item.flag) {
                    sum += parseInt(item.count) *  parseInt(item.price);
                    count += item.count;
                }
            });
            return {sum: sum, count: count}
        },

        // 返回商品勾选状态，默认勾选
        getGoodsSelected(state) {
            var obj = {};
            state.goodsinfo.forEach(item => {
                obj[item.id] = item.flag
            });
            return obj


        }
    }

});

// 创建Vue实例
var vm = new Vue({
    el: '#app',
    data: {},

    //渲染简写，使用components报错
    render: c => c(app),
    router,
    store

});

