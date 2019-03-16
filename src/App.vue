
<template>
    <div class="app-container">

        <!--顶部 Header 区域-->
        <mt-header fixed title="Bai Shui">
            <span  slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <!--中间 路由Content 区域-->
        <transition>
            <router-view></router-view>
        </transition>


        <!--底部 Tabar 区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-llb " to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/shopcart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>


    </div>
</template>

<script>
    export default {
        data(){
            return {
                flag: false,
            }
        },
        created(){
            if (this.$route.path === '/home') {

                this.flag = false
            } else {
                this.flag = true
            }
        },
        methods: {
            // 回退
            goBack(){
                if (this.$route.path === '/home') {
                    this.flag = false
                } else {
                    this.$router.go(-1)
                }

            },

        },
        // 监控路由的改变
        watch: {
            "$route.path": function(newStr, oldStr) {
                if (newStr === '/home'){
                    this.flag = false
                } else {
                    this.flag = true
                }
            }
        }
    }
</script>

<style scoped>

    .app-container {
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;
        background: #fff;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
        position: absolute;
    }

    /*该类名，解决 tabbar 点击无法切换的问题*/
       .mui-bar-tab .mui-tab-item-llb.mui-active {
           color: #007aff;
       }

    .mui-bar-tab .mui-tab-item-llb {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>