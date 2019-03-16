<template>
    <div class="photo-container">
        <!--滚动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id===0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getImages(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!--图片-->
        <div class="img-list">
            <ul class="img-box">
                <router-link v-for="item in imgList" :to="'/home/photoinfo/'+item.id" tag="li">
                    <img v-lazy="item.img_url">
                    <div class="img-des">
                        <h3>{{item.title}}</h3>
                        <div>{{item.zhaiyao}}</div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                cates: [],
                imgList: []
            }
        },
        created(){
            this.getCates();
            this.getImages(0)
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getCates(){
                this.$http.get('api/getimgcategory').then(data => {
                    if (data.body.status === 0) {
                        data.body.message.unshift({title: "全部", id: 0});
                        this.cates = data.body.message
                    } else {
                        Toast("图片分类加载失败....")
                    }

                })
            },
            getImages(id){
                this.$http.get('api/getimages/' + id).then(data => {
                    if (data.body.status === 0) {
                        // console.log(data.body.message);
                        this.imgList = data.body.message
                    } else {
                        Toast("图片列表加载失败....")
                    }

                })
            }
        }
    }
</script>

<style scoped lang="less">
    * { touch-action: pan-y; }
    .photo-container {
        .img-list {
            padding: 0 10px;
            width: 100%;

            .img-box {
                margin: 0;
                padding: 0;
                list-style: none;
                li {
                    box-shadow: 0 0 10px #999;
                    margin-top: 10px;
                    background: #ccc;
                    min-height: 300px;
                    text-align: center;
                    position: relative;

                    img {
                        width: 100%;
                        vertical-align: middle;
                    }
                    img[lazy=loading] {
                        width: 40px;
                        height: 300px;
                        margin: auto;
                    }

                    .img-des {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        background: rgba(0,0,0,.3);
                        color: #fff;
                        text-align: left;
                        height: 84px;
                        h3 {
                            font-size: 14px;
                            font-weight: 700;
                        }
                        div {
                            font-size: 13px;
                        }
                    }
                }



            }
        }
    }

</style>