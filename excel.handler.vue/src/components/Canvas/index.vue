<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import type { rowOpt, colOpt, textOpt, ellipsisText } from './index';
import type { PropType } from "vue";

const props = defineProps({
    texts: {
        type: Array as PropType<[][]>,
        default() {
            // return []
            return [['2大撒dsa大撒大撒大撒大撒大撒大撒大撒', '3'], ['3', '4'], ['4', '9']]
        }
    },
    colWidth: {
        type: Number,
        default: 200
    },
    rowHeight: {
        type: Number,
        default: 40
    },
    singleWord: {
        type: String,
        default: '达'
    },
    ellipsisWord: {
        type: String,
        default: '...'
    },
    fontSize: {
        type: Number,
        default: 18
    },
    fontColor: {
        type: String,
        default: '#9d9d9d'
    },
    noneText: {
        type: String,
        default: '暂无任何数据'
    },
    noneWidth: {
        type: Number,
        default: 600
    },
    noneHeight: {
        type: Number,
        default: 100
    }
});

const excelCanvas = ref(null)
let hasTexts = true;

const colNum = (function () {
    if (props.texts[0]?.length >= 0 && Object.prototype.toString.call(props.texts[0]) === "[object Array]") {
        return props.texts[0].length
    } else {
        hasTexts = false;
        return 0;
    }
})()  //列

const rowNum = (function () {
    return props.texts.length
})() //行

const xOffset = 5;
const yOffset = 35;

let singleWordPx = 0
let ellipsisWordPx = 0

onMounted(() => {
    const canvas: HTMLCanvasElement = excelCanvas.value!
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#9d9d9d";
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = props.fontColor || "black";
    ctx.font = `${props.fontSize}px Microsoft YaHei` || "12px Microsoft YaHei";

    singleWordPx = countStrWidth(ctx, props.singleWord)
    ellipsisWordPx = countStrWidth(ctx, props.ellipsisWord)

    hasTexts ? drawCanvas(ctx) : drawNone(ctx);

})

/**
 * 计算字符串的宽度
 * @param ctx 
 * @param text
 */
const countStrWidth = (ctx: CanvasRenderingContext2D, text: string) => {
    const dimension = ctx!.measureText(text)
    return dimension.width
}

function drawCanvas(ctx: CanvasRenderingContext2D) {

    for (let rowStart = 1; rowStart <= rowNum; rowStart++) {
        let y = (rowStart - 1) * props.rowHeight + yOffset;
        for (let colStart = 1; colStart <= colNum; colStart++) {
            let x = (colStart - 1) * props.colWidth + xOffset;
            drawText({
                ctx,
                colWidth: props.colWidth,
                singleWordPx,
                fontSize: props.fontSize,
                text: props.texts[rowStart - 1][colStart - 1],
                x,
                y
            })
        }
    }

    ctx.restore();

    drawRow({ ctx, rowNum, rowHeight: props.rowHeight, colWidth: props.colWidth })
    drawCol({ ctx, colNum, rowHeight: props.rowHeight, colWidth: props.colWidth })
}

function drawNone(ctx: CanvasRenderingContext2D) {
    const noneTextPx = countStrWidth(ctx, props.noneText);
    const x = props.noneWidth / 2 - noneTextPx / 2;
    const y = props.noneHeight / 2;
    ctx.fillText(props.noneText, x, y);
}

function drawText(params: textOpt) {
    const {
        ctx,
        colWidth,
        singleWordPx,
        fontSize,
        text,
        x,
        y
    } = params;

    const textPx = countStrWidth(ctx, text);

    const textWords = getWords({
        singleWordPx,
        ellipsisWordPx,
        textPx,
        colWidth,
        text
    })

    ctx.fillText(textWords, x, y);

    /**
     * 获取截取单元格长度后的字符串
     * @param params 
     */
    function getWords(params: ellipsisText) {
        const {
            singleWordPx,
            ellipsisWordPx,
            textPx,
            colWidth,
            text
        } = params;
        if (textPx < colWidth) return text;
        const wordPx = colWidth - ellipsisWordPx - xOffset;
        const wordNum = Math.trunc(wordPx / singleWordPx);
        const result = text.slice(0, wordNum + 1) + props.ellipsisWord
        return result;
    }

}

/**
 * 行的作画
 * @param {Object} params 
 */
function drawRow(params: rowOpt) {
    const {
        ctx,
        rowNum,
        rowHeight,
        colWidth
    } = params;
    for (let rowStart = 1; rowStart < rowNum; rowStart++) {
        let ponit = rowStart * rowHeight + 0.5
        ctx.moveTo(0, ponit)
        ctx.lineTo(colNum * colWidth + 0.5, ponit);
        ctx.stroke();
    }
}

function drawCol(params: colOpt) {
    const {
        ctx,
        colNum,
        rowHeight,
        colWidth
    } = params;
    for (let colStart = 1; colStart < colNum; colStart++) {
        let ponit = colStart * colWidth + 0.5
        ctx.moveTo(ponit, 0);
        ctx.lineTo(ponit, rowNum * rowHeight + 0.5);
        ctx.stroke(); // Draw it
    }
}

</script>

<template>
    <div class="canvas-contain">
        <canvas v-if="hasTexts" ref="excelCanvas" :width="colNum * colWidth" :height="rowNum * rowHeight"
            style="border:1px solid #9d9d9d;"></canvas>
        <canvas v-else ref="excelCanvas" :width="noneWidth" :height="noneHeight"
            style="border:1px solid #9d9d9d;"></canvas>
    </div>
</template>

<style lang='less' scoped>
@import './index.less';
</style>