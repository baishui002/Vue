<template>
    <div class="goodsinfo-container">
        <!--红色球-->
        <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
        >
            <div class="ball" ref="ball" v-show="flag"></div>
        </transition>

        <!--轮播图-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <imgbox :imgList="imgList" :isfull="false"></imgbox>
                </div>
            </div>
        </div>

        <!--商品信息-->
        <div class="mui-card">
            <div class="mui-card-header">{{msg.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price-info">
                        市场价&nbsp;&nbsp;<del>￥{{msg.market_price}}</del>&nbsp;&nbsp;销售价<span class="price">&nbsp;&nbsp;￥{{msg.sell_price}}</span>
                    </p>
                    <p class="number">购买数量：
                        <numbox @getNum="getNum" :maxNum="maxNum"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{msg.goods_no}}</p>
                    <p>库存情况：{{msg.stock_quantity}}</p>
                    <p>上架时间：{{msg.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button class="text-btn" type="primary" size="large" plain @click="getGoodsDes">图文介绍</mt-button>
                <mt-button class="text-btn" type="danger" size="large" plain @click="goComment">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import imgbox from '../subcomponets/lunBoTu.vue';
    import numbox from '../subcomponets/goodsInfo_numBox.vue';


    export default {
        data() {
            return {
                id: this.$route.params.id,
                imgList: [],
                flag: false,
                msg: '',
                maxNum: '',
                count: 1
            }
        },
        created() {
            this.getImg();
            this.getGoodsInfo();
        },
        methods: {
            // 轮播图
            getImg() {
                this.$http.get('api/getthumimages/' + this.id).then(data => {
                    // console.log(data.body)
                    if (data.body.status == 0) {
                        this.imgList = data.body.message;
                    } else {
                        Toast('轮播图加载失败。。。')
                    }

                })

            },

            // 商品信息
            getGoodsInfo() {
                // api/goods/getinfo/87
                this.$http.get('api/goods/getinfo/' + this.id).then(data => {
                    // console.log(data.body)
                    if (data.body.status == 0) {
                        this.msg = data.body.message[0];
                        this.maxNum = this.msg.stock_quantity;
                    } else {
                        Toast('轮播图加载失败。。。')
                    }

                })
            },

            // 商品评论
            goComment() {
                this.$router.push({name: 'goodsCmt', params: {id: this.id}})
            },

            // 商品图文信息
            getGoodsDes() {
                // api/goods/getdesc
                this.$router.push({name: 'goodsdes', params: {id: this.id}})
            },

            //接收numBox子组件传递的数量
            getNum(num) {
                this.count = parseInt(num)
            },

            // 加入购物车
            addCar() {
                //改变小球状态
                this.flag = !this.flag;

                var goodsInfo = {
                    flag: true,
                    id: parseInt(this.id),
                    count: this.count,
                    price : this.msg.sell_price
                };
                this.$store.commit('addCar', goodsInfo)



            },
            // 动画
            beforeEnter: function (el) {
                // getBoundingClientRect();
                el.style.transform = "translate(0,0)"
            },
            enter: function (el, done) {
                var ballElement = el.getBoundingClientRect();
                var carElementd = document.getElementById('badge').getBoundingClientRect();

                var distanceX = carElementd.x - ballElement.x;
                var distanceY = carElementd.y - ballElement.y;
                // console.log(distanceX, distanceY)
                // console.log( `translate(${distanceX}px,${distanceY}px)`)
                el.offsetWidth;
                el.style.transform = `translate(${distanceX}px,${distanceY}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.48,.85,.78,.36)";
                // el.style.transition = "all 0.5s ease";

                done()
            },
            afterEnter: function (el) {
                this.flag = !this.flag
            },

        },
        components: {
            imgbox,
            numbox,

        }
    }
</script>

<style scoped lang="less">
    .goodsinfo-container {
        background: #eee;
        /*解决div margin-top塌陷*/
        overflow: hidden;

        .ball {
            width: 15px;
            height: 15px;
            background: red;
            border-radius: 50%;
            position: absolute;
            left: 150px;
            top: 390px;
            z-index: 999;

        }

        .mui-card-content-inner {
            .price-info {
                line-height: 20px;

                .price {
                    color: red;
                    font-size: 16px;
                    font-weight: 700;
                }
            }
        }

        .mui-card-footer {
            display: block;

            .text-btn {
                margin-top: 10px;
            }
        }

    }


</style>