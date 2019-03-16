<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <!-- "-"按钮，点击可减小当前数值 -->
        <button class="mui-btn mui-numbox-btn-minus"   type="button">-</button>
        <input class="mui-numbox-input" type="number" @change="numChange" ref="num"/>
        <!-- "+"按钮，点击可增大当前数值 -->
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
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
            mui('.mui-numbox').numbox().setOption('max',this.maxNum)
        },
        methods: {
            numChange(){
                // console.log(this.$refs.num.value)
                this.$emit('getNum', this.$refs.num.value)

            }
        },
        props:['maxNum']
    }
</script>

<style scoped>

</style>