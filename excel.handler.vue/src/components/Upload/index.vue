<template>
    <div class="upload-contain">
        <el-upload v-model:file-list="fileList" ref="uploadRef" action drag multiple :auto-upload="false">
            <el-icon class=" el-icon--upload">
                <upload-filled />
            </el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
            </template>
        </el-upload>

        <div class="btn-group">
            <el-button type="primary" @click="submitExcel">确定</el-button>
            <el-button>取消</el-button>
        </div>
    </div>
</template>
  
<script setup lang="ts">

import { UploadFilled } from '@element-plus/icons-vue'
import { getCurrentInstance, ref } from 'vue';
import type { UploadInstance, UploadUserFile, UploadRawFile } from 'element-plus'

let { proxy } = getCurrentInstance() as any;
const fileList = ref<UploadUserFile[]>([])
const uploadRef = ref<UploadInstance>()
const paramsData = new FormData();

async function uploadExcel() {
    const result = await proxy.$api.uploadExcel(paramsData)
    if (result.status === 200) {
        for (let file of fileList.value) {
            file.status = 'success';
        }
        successHandler()
    } else {
        for (let file of fileList.value) {
            file.status = 'fail';
        }
        errorHandler()
    }
}

function appendExcel() {
    for (let file of fileList.value) {
        paramsData.append('excels', file.raw as UploadRawFile)
    }
}

function submitExcel() {
    appendExcel();
    uploadExcel();
}

function errorHandler() {
    console.log('errrrrrrrr')
}

function successHandler() {
    console.log('sssssssssssssssssssssss')
}

</script>
<style lang="less" scoped>
@import './index.less';
</style>