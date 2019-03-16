import VueRouter from 'vue-router'


import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import photolist from './components/photo/photoList.vue'
import photoinfo from './components/photo/photoInfo.vue'
import goodslist from './components/goods/goodsList.vue'
import goodsinfo from './components/goods/goodsInfo.vue'
import goodscomment from './components/goods/goodsComment.vue'
import goodsdes from './components/goods/goodsDes.vue'


var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcart', component: ShopcartContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsList},
        {path: '/home/newsinfo/:id', component: NewsInfo},
        {path: '/home/photolist', component: photolist},
        {path: '/home/photoinfo/:id', component: photoinfo},
        {path: '/home/goodslist', component: goodslist},
        {path: '/home/goodsinfo/:id', component: goodsinfo},
        {path: '/home/goodscomment/:id', component: goodscomment, name: 'goodsCmt'},
        {path: '/home/goodsdes/:id', component: goodsdes, name: 'goodsdes'},

    ],
    linkActiveClass: 'mui-active'
});

export default router