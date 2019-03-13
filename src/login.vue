<template>
    <div>
        <h1>这是登录组件</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: '1234'
            };
        },
        methods: {
            show(){
                console.log('调用vue组件的show方法')
            }
        }

    }
</script>

<style scoped>

</style>