<template>
    <commentbox :id="id"></commentbox>
</template>

<script>
    import commentbox from '../subcomponets/Comment.vue'

    export default {
        data(){
            return {
                id:this.$route.params.id
            }
        },
        created(){
            // console.log(this.$route);
            // this.id = this.$route.params.id
        },
        components: {
            commentbox
        }
    }
</script>

<style scoped>

</style>