<template>
    <h2>我是Webpack渲染出来的vue</h2>
    <h2>{{title}}</h2>
    <hello-world></hello-world>
</template>

<script>
import HelloWorld from "./HelloWorld.vue"
export default {
    components: {
        HelloWorld
    },
    data() {
        return {
            title: 'Hello Word'
        }
    },
    methods: {

    }

}

</script>
<style scoped>
h2 {
    color: red;
}
</style>
