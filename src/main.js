import $ from 'jquery'


// 导入bootstrap 样式
import './css/index.css'
import 'bootstrap/dist/css/bootstrap.css'

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
Vue.http.options.root = 'http://www.liulongbin.top:3005/api';

// 导入路由表
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'



// 按需导入mint-ui中的组件
import {Header, Swipe, SwipeItem, Button} from 'mint-ui'

// 注册
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

// 全局过滤器
import moment from 'moment'
Vue.filter('dateFormat',function (dateStr, pattern='YYYY-MM-DD HH:mm:ss') {
   return moment(dateStr).format(pattern)
});

// 创建Vue实例
var vm = new Vue({
   el: '#app',
   data:{},

   //渲染简写，使用components报错
   render: c => c(app),
   router

});

