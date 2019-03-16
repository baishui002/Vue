
<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in imgList" :key="item.id">
                <img :src="item.img||item.src" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        props: ['imgList', 'isfull']
    }
</script>

<style scoped lang="less">
    .mint-swipe {
        height: 200px;

        .mint-swipe-item {
            text-align: center;
            img {
                /*width: 100%;*/
                height: 100%;
            }
        }
    }

    .full {
        width: 100%;
    }

</style>