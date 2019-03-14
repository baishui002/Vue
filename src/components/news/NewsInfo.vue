<template>
    <div class="newsinfo-container">
        <!--标题-->
        <h1 class="newsinfo-title">{{newsinfo.title}}</h1>
        <p class="newsinfo-time">
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!--内容-->
        <div v-html="newsinfo.content"></div>

        <!--评论-->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import comment from '../subcomponets/Comment.vue'

    export default {
        data(){
            return {
                id: '',
                newsinfo: '',

            }
        },
        created(){
            this.getNewsInfo();
        },
        methods: {
            getNewsInfo() {
                this.id = this.$route.params.id;
                this.$http.get('getnew/' + this.id).then(data => {
                    if (data.body.status === 0) {
                        this.newsinfo = data.body.message[0];
                        // console.log(data.body.message[0]);
                    } else {
                        Toast("加载新闻内容失败...")
                    }
                })
            },
        },
        components: {
            "comment-box": comment
        }
    }
</script>

<style scoped lang="less">
    .newsinfo-container {
        background: #fff;
        padding: 0 5px;

        .newsinfo-title {
            font-size: 16px;
            color: red;
            margin: 15px 0;

            text-align: center;
            font-weight: 700;
        }
        .newsinfo-time {
            color: #226aff;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }



    }



</style>