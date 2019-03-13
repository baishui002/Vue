import $ from 'jquery'

import './css/index.css'
import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import app from './App.vue'

import router from './router.js'

var vm = new Vue({
   el: '#app',
   data:{},

   //简写
   render: c => c(app),
   router

});

