<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comment" :key="index">
                <div class="cmt-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content==='undefined'?'此用户无评论': item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                pageindex: 1,
                comment: []
            }
        },
        created(){
            this.getNewsComment();
        },
        methods: {
            getNewsComment() {
                this.$http.get('getcomments/' + this.id + '?pageindex=' + this.pageindex).then(data => {
                    if (data.body.status === 0) {
                        this.comment = this.comment.concat(data.body.message);
                        // console.log(data.body);
                    } else {
                        Toast("加载新闻评论失败...")
                    }
                })

            },
            getMore(){
                this.pageindex ++;
                this.getNewsComment();
            }
        },
        props: ['id']
    }
</script>

<style scoped lang="less">
    .comment-container {
        hr {
            margin: 10px;
            box-sizing: content-box;
            height: 0px;
        }
        textarea{
            padding-top: 10px;
            text-indent: 2em;
            margin-top: 5px;
        }
        .cmt-list {
            margin-top: 5px;

            .cmt-item {
                font-size: 12px;

            }
            .cmt-title {
                background: #ccc;
                line-height: 30px;

            }
            .cmt-body {
                padding-left: 10px;
                line-height: 35px;
            }
        }

    }
</style>