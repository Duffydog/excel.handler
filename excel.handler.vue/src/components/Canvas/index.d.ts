interface baseOpt {
    ctx:CanvasRenderingContext2D,
    rowHeight:number,
    colWidth:number
}

interface rowOpt extends baseOpt {
    rowNum:number
}

interface colOpt extends baseOpt {
    colNum:number
}

interface textOpt {
    ctx:CanvasRenderingContext2D,
    colWidth:number
    singleWordPx:number,
    fontSize?:number,
    text:string,
    x:number,
    y:number
}

interface ellipsisText{
    singleWordPx:number,
    ellipsisWordPx:number,
    textPx:number,
    colWidth:number,
    text:string
}


export {
    rowOpt,
    colOpt,
    textOpt,
    ellipsisText
}