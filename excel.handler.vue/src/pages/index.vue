<script setup lang='ts'>
import { getCurrentInstance } from 'vue';
import axios from 'axios';
import Upload from "../components/Upload/index.vue";
import Select from "../components/Select/index.vue";
import Canvas from "../components/Canvas/index.vue";

let { proxy } = getCurrentInstance() as any;
// async function getUser() {
//   try {
//     const response = await axios.get('/api');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
// getUser();
async function kk() {
  const result = await proxy.$api.test()
  console.log(result)
}
kk();
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