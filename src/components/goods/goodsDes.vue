<template>
    <div class="goodsDes-container">
        <h1>{{msg.title}}</h1>
        <hr>
        <div class="content" v-html="msg.content" ></div>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        data(){
            return {
                id: this.$route.params.id,
                msg: ''
            }
        },
        created(){
            this.getDes()
        },
        methods: {
            getDes(){
                this.$http.get('api/goods/getdesc/'+this.id).then(data => {

                    if (data.body.status === 0) {
                        this.msg = data.body.message[0];
                    }else {
                        Toast('商品信息加载失败。。。')
                    }

                })
            }
        },
        // props: ['id']
    }
</script>

<style lang="less">
    .goodsDes-container {
        padding-top: 5px;
        h1 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
            font-weight: 700;
        }

        .content {
                img {
                    width: 100%;
                }

        }
        
    }

</style>