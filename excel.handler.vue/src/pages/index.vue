<script setup lang='ts'>
import axios from 'axios';
import Upload from "../components/Upload/index.vue";
import Select from "../components/Select/index.vue";
import Canvas from "../components/Canvas/index.vue";

async function getUser() {
  try {
    const response = await axios.get('/api');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
getUser();
console.log(axios)
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