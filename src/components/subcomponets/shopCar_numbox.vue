<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <!-- "-"按钮，点击可减小当前数值 -->
        <button class="mui-btn mui-numbox-btn-minus"   type="button" >-</button>
        <input class="mui-numbox-input" type="number" readonly :value="goodscount" @change="numChange" ref="count"/>
        <!-- "+"按钮，点击可增大当前数值 -->
        <button class="mui-btn mui-numbox-btn-plus" type="button" >+</button>
    </div>
</template>

<script>

    import mui from '../../lib/mui/js/mui.min'

    export default {
        data(){
            return {

            }
        },
        mounted(){
            mui('.mui-numbox').numbox();
            // mui('.mui-numbox').numbox().setOption('max',this.maxNum)
        },
        methods: {
            numChange(){
                var obj = {
                    id: this.goodsId,
                    count: this.$refs.count.value
                };
                this.$store.commit('updateGoodsCount', obj)

            },

        },
        props: ['goodscount', 'goodsId']
    }
</script>

<style scoped>

</style>