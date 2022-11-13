<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import type { rowOpt, colOpt, textOpt, ellipsisText } from './index';
import type { PropType } from "vue";

const props = defineProps({
    texts:{
        type: Array as PropType<[][]>,
        default() {
            return [['2','3'],['3','4'],['4','9']]
        }
    },
    colWidth:{
        type:Number,
        default:200
    },
    rowHeight:{
        type:Number,
        default:40
    },
    singleWord:{
        type:String,
        default:'aa'
    },
    ellipsisWord:{
        type:String,
        default:'...'
    },
    fontSize:{
        type:Number,
        default:12
    },
    fontColor:{
        type:String,
        default:'#9d9d9d'
    }    
});

const excelCanvas = ref(null)
const colNum = (function(){
    if(props.texts[0] ?. length >= 0 && Object.prototype.toString.call(props.texts[0]) === "[object Array]"){
        return props.texts[0].length
    }else{
        throw new Error('传入texts类型不为[][]！')
    }
})()  //列
const rowNum = (function (){
    return props.texts.length
})() //行

const xOffset = 5;
const yOffset = 35;

/**
 *获取字符串的px长度
 * @param str 
 * @param font_size 
 */
const getLenPx = (str: string, font_size: number = 12) => {
    let str_leng = str.replace(/[^\x00-\xff]/gi, 'aa').length;
    return str_leng * font_size / 2
}

const singleWordPx = getLenPx(props.singleWord, props.fontSize)
const ellipsisWordPx = getLenPx(props.ellipsisWord, props.fontSize)

onMounted(() => {
    const canvas: HTMLCanvasElement = excelCanvas.value!
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#9d9d9d"; // Green path

    drawRow({ ctx, rowNum, rowHeight:props.rowHeight, colWidth:props.colWidth })
    drawCol({ ctx, colNum, rowHeight:props.rowHeight, colWidth:props.colWidth })

    for(let rowStart = 1; rowStart <= rowNum; rowStart++){
        let y = (rowStart - 1) * props.rowHeight + yOffset;
        for(let colStart = 1; colStart <= colNum; colStart++){
            let x = (colStart - 1) * props.colWidth + xOffset;
            drawText({
                ctx,
                colWidth:props.colWidth,
                singleWordPx,
                fontSize:props.fontSize,
                fontColor:props.fontColor,
                text:props.texts[rowStart-1][colStart-1],
                x,
                y
            })
        }
    }
})

function drawText(params: textOpt) {
    const {
        ctx,
        colWidth,
        singleWordPx,
        fontSize,
        fontColor,
        text,
        x,
        y
    } = params;

    ctx.beginPath();
    ctx.fillStyle = fontColor || "black";
    ctx.font = `${fontSize}px` || "12px normal";

    const textPx = getLenPx(text, fontSize);

    const textWords = getWords({
        singleWordPx,
        ellipsisWordPx,
        textPx,
        colWidth,
        text
    })

    console.log(textWords, x, y)
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
        const wordPx = colWidth - ellipsisWordPx;
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
        ctx.moveTo(0, rowStart * rowHeight)
        ctx.lineTo(colNum * colWidth, rowStart * rowHeight);
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
        ctx.moveTo(colStart * colWidth, 0);
        ctx.lineTo(colStart * colWidth, rowNum * rowHeight);
        ctx.stroke(); // Draw it
    }
}

</script>

<template>
    <div class="canvas-contain">
        <canvas ref="excelCanvas" :width="colNum * colWidth" :height="rowNum * rowHeight"
            style="border:2px solid #9d9d9d;"></canvas>
    </div>
</template>

<style lang='less' scoped>
@import './index.less';
</style>