<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" v-model="message"></textarea>
        <mt-button type="primary" size="large"  @click="postCmt">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comments" :key="index">
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
                comments: [],
                message: ''
            }
        },
        created(){
            this.getNewsComment();
        },
        methods: {
            getNewsComment() {
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(data => {
                    if (data.body.status === 0) {
                        this.comments = this.comments.concat(data.body.message);
                    } else {
                        Toast("加载新闻评论失败...")
                    }
                })

            },
            getMore(){
                this.pageindex ++;
                this.getNewsComment();
            },
            postCmt(){
                var content = this.message;
                if (content.trim().length ===0 ){
                    return Toast("评论不能为空....")
                }

                this.$http.post('postcomment/'+ this.id, {"content": content}).then(data => {
                    if (data.body.status === 0 ){
                        this.comments.unshift({
                            "add_time": Date.now(),
                            "user_name": "匿名用户",
                            "content": content
                        });
                        this.message = '';
                        Toast("提交成功");
                        // this.getNewsComment()
                    } else {
                        Toast("提交失败")
                    }

                })
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
            margin: 0;
            font-size: 14px;
            height: 85px;
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