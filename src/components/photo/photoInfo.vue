<template>
    <div class="photoinfo-container">
        <!--头部-->
        <div class="info-title">
            <h3>现代简约 明亮的外表卧室卧室背景墙、吊顶黄色</h3>
            <p>
                <span>发表时间：2015-04-18 12:30:50</span>
                <span>点击：0次</span>

            </p>
        </div>
        <hr>
        <!--图片-->
        <div class="info-img-item">
            <div class="img-box">
                <vue-preview
                        :list="list"
                        :thumbImageStyle="{width: '100px', height: '100px', margin: '10px'}"
                        :tapToClose="true"
                />
            </div>

            <div class="img-des" v-html="msg.content">

            </div>
        </div>
        <!--评论-->
        <cmt-box :id="id"></cmt-box>

    </div>
</template>

<script>
    import comment from '../subcomponets/Comment.vue'
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {
                id: '',
                list: [],
                msg:''
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getPhoto();
            this.getPhotoInfo()
        },
        methods: {
            getPhoto() {
                this.$http.get('api/getthumimages/' + this.id).then(data => {
                    if (data.body.status === 0) {
                        data.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 600;
                        });
                        this.list = data.body.message
                    } else {
                        Toast("图片加载失败....")
                    }
                })
            },
            getPhotoInfo(){

                this.$http.get('api/getimageInfo/' + this.id).then(data => {
                    if (data.body.status === 0) {
                        this.msg = data.body.message[0]
                    } else {
                        Toast("图片内容加载失败....")
                    }
                })
            }

        },
        components: {
            'cmt-box': comment
        }

    }
</script>

<style scoped lang="less">
    .photoinfo-container {
        .info-title {
            padding: 0 5px;

            h3 {
                color: #26a2ff;
                font-size: 15px;
                text-align: center;
                font-weight: 700;
                padding: 15px 0;
            }

            p {
                font-size: 12px;
                display: flex;
                justify-content: space-between;

            }
        }
        .info-img-item {
            .img-box {
                min-height: 100px;
            }
            .img-des {
                font-size: 12px;
                padding: 10px 0;
                line-height: 30px;
                min-height: 120px;
            }
        }


    }


</style>