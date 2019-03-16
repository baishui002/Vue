<template>
    <div class="shopCar-container">
        <div class="mui-card" v-for="(item, index) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--开关按钮-->
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelected(item.id, $store.getters.getGoodsSelected[item.id])">
                    </mt-switch>

                    <!--图片-->
                    <img :src="item.thumb_path" alt="">
                    <!--商品信息-->
                    <div class="info">
                        <h3>{{item.title}}</h3>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>

                            <!--数字输入框-->
                            <numbox class="numbox" :goodscount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                            <a href="javascript:;" @click="delGood(item.id, index)">删除</a>
                        </p>
                    </div>
                </div>
            </div>

            <!--<p>{{item.id}}</p>-->
        </div>


        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div>
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsAllPriceAndCount.count}}</span>件，总价 <span class="red">￥{{$store.getters.getGoodsAllPriceAndCount.sum}}</span></p>
                    </div>
                    <p>
                        <mt-button type="danger" size="normal">去结算</mt-button>
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import numbox from '../subcomponets/shopCar_numbox.vue'

    export default {
        data() {
            return {
                goodsList: []
            }
        },
        created() {
            this.getCarGoodInfo()
        },
        methods: {
            getCarGoodInfo() {

                var goodInfo = JSON.parse(localStorage.getItem('info') || '[]');

                var ids = [];
                goodInfo.forEach(item => {
                    ids.push(parseInt(item.id))
                });

                this.$http.get('api/goods/getshopcarlist/' + ids.join(',')).then(data => {
                    if (data.body.status === 0) {
                        this.goodsList = data.body.message;

                    } else {
                        Toast('购物车商品加载失败。。。')
                    }

                })

            },

            // 修改商品状态
            changeSelected(id, flag){
                this.$store.commit('updateGoodsSelected',{
                    id,
                    flag: flag
                })
            },

            //删除商品
            delGood(id, index){
                this.goodsList.splice(index, 1)
                this.$store.commit('delGood', id)
            }
        },
        components: {
            numbox
        }
    }
</script>

<style scoped lang="less">
    .shopCar-container {
        overflow: hidden;
        background: #eee;

        .mui-card-content-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 60px;
                height: 60px;
            }

            .info {
                h3 {
                    font-size: 13px;

                }

                .numbox {
                    height: 25px;
                }

                .price {
                    color: red;
                    font-size: 14px;
                    font-weight: 700;
                }
            }

            .red {
                font-weight: 700;
                color: red;
            }

        }


    }


</style>