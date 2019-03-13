import $ from 'jquery'

import './css/index.css'
import 'bootstrap/dist/css/bootstrap.css'

import './lib/mui/css/mui.min.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import app from './App.vue'

import router from './router.js'

// 按需导入mint-ui中的组件
import {Header} from 'mint-ui'
Vue.component(Header.name, Header);


var vm = new Vue({
   el: '#app',
   data:{},

   //简写
   render: c => c(app),
   router

});

