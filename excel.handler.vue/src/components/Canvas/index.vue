<script setup lang='ts'>
import { ref, onMounted } from 'vue';

const excelCanvas = ref(null)
const colWidth = 200 //列宽
const rowHeight = 40 //行高
const colNums = 10  //列
const rowNums = 5 //行

const getLenPx = (str: string, font_size: number) => {
    let str_leng = str.replace(/[^\x00-\xff]/gi, 'aa').length;
    return str_leng * font_size / 2
}

onMounted(() => {
    const canvas: HTMLCanvasElement = excelCanvas.value!
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#9d9d9d"; // Green path
    for (let rowStart = 1; rowStart < rowNums; rowStart++) {
        ctx.moveTo(0, rowStart * rowHeight);
        ctx.lineTo(colNums * colWidth, rowStart * rowHeight);
        ctx.stroke(); // Draw it


    }

    for (let colStart = 1; colStart < colNums; colStart++) {
        ctx.moveTo(colStart * colWidth, 0);
        ctx.lineTo(colStart * colWidth, rowNums * rowHeight);
        ctx.stroke(); // Draw it
    }


})

function drawText(ctx: CanvasRenderingContext2D, rowStart: number) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "20px normal";
    let text = "大使馆几乎都是";
    console.log(getLenPx("大使馆几乎都是", 20));
    if (text.length > 8) {
        text = text.slice(0, 8) + '...'
    }
    ctx.fillText(text, 0, rowStart + 35);
}


function drawRow(ctx: CanvasRenderingContext2D, data: any[]) {
    for (let i = 0, iLen = data.length; i < iLen; i++) {
        for (let j = 0, jLen = data[i].length; j < jLen; j++) {
            ctx.moveTo(colStart * colWidth, 0);
            ctx.lineTo(colStart * colWidth, rowNums * rowHeight);
            ctx.stroke(); // Draw it
        }
    }
}

</script>

<template>
    <div class="canvas-contain">
        <canvas ref="excelCanvas" :width="colNums * colWidth" :height="rowNums * rowHeight"
            style="border:2px solid #9d9d9d;"></canvas>
    </div>
</template>

<style lang='less' scoped>
@import './index.less';
</style>