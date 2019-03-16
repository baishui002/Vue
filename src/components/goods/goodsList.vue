<template>
    <div class="goods-container">
        <!--第一方式：使用a标签进行页面跳转-->
        <!--<div class="goods-list">-->
        <!--<router-link class="goods-box" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">-->
        <!--<img :src="item.img_url" alt="">-->
        <!--<h1>{{item.title}}</h1>-->
        <!--<div class="goods-con">-->
        <!--<p class="goods-price">-->
        <!--<span class="new-price">￥{{item.sell_price}}</span>&nbsp;&nbsp;-->
        <!--<span class="old-price">￥{{item.market_price}}</span>-->
        <!--</p>-->
        <!--<p class="goods-des">-->
        <!--<span>热卖中</span>-->
        <!--<span>剩{{item.stock_quantity}}件</span>-->
        <!--</p>-->
        <!--</div>-->
        <!--</router-link>-->
        <!--</div>-->

        <!--第二种方式：使用编程式导航，js原生：window.history.href-->
        <div class="goods-list">
            <div class="goods-box" v-for="item in goodsList" :key="item.id" @click="getGoodsDetail(item.id)">
                <img :src="item.img_url" alt="">
                <h1>{{item.title}}</h1>
                <div class="goods-con">
                    <p class="goods-price">
                        <span class="new-price">￥{{item.sell_price}}</span>&nbsp;&nbsp;
                        <span class="old-price">￥{{item.market_price}}</span>
                    </p>
                    <p class="goods-des">
                        <span>热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {
                pageindex: 1,
                goodsList: []
            }
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList() {
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(data => {
                    if (data.body.status === 0) {
                        if (data.body.message.length === 0) {
                            return Toast("没有更多商品了。。。")
                        }
                        this.goodsList = this.goodsList.concat(data.body.message);
                        // console.log(data.body);
                    } else {
                        Toast("加载商品列表失败...")
                    }
                })
            },
            getMore() {
                this.pageindex++;
                this.getGoodsList();
            },
            getGoodsDetail(id){
                // console.log(this.$router);
                this.$router.push('/home/goodsinfo/'+id)
            }
        }
    }
</script>

<style scoped lang="less">
    .goods-container {
        padding: 15px 7px;
        padding-bottom: 0;

        .goods-list {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .goods-box {
                width: 49%;
                min-height: 170px;
                box-shadow: 0 0 7px #999;
                margin-bottom: 13px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                img {
                    width: 100%;
                }

                h1 {
                    font-size: 14px;
                    font-weight: 700;
                    color: #000;
                    padding-bottom: 5px;
                    padding-left: 5px;
                }

                .goods-con {
                    background: #eee;

                    p {
                        margin: 0;
                        padding: 10px 0;
                    }

                    .goods-price {
                        padding-left: 10px;

                        .new-price {
                            font-size: 15px;
                            color: red;
                            font-weight: 700;
                        }

                        .old-price {
                            text-decoration: line-through;
                        }
                    }

                    .goods-des {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 10px;
                    }


                }
            }
        }

    }


</style>