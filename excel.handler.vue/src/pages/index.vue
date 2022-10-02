<script setup lang='ts'>
import Upload from "../components/Upload/index.vue";
import Select from "../components/Select/index.vue";
import Canvas from "../components/Canvas/index.vue";
</script>

<template>
    <div class="header">
        <Upload></Upload>
        <Select></Select>
    </div>
    <div class="content">
        <Canvas></Canvas>
    </div>
</template>

<style lang='less' scoped>
@import './index.less';
</style>