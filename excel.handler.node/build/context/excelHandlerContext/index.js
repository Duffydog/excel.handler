"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const excelDatas = node_xlsx_1.default.parse(path_1.default.resolve(__dirname, "../../../excels/工作簿1.xlsx"));
const FONT_SIZE = 12;
const UNIT_WORD = "aa";
const ELLIPSIS_WORD = "...";
const UNIT_PX = getLenPx(UNIT_WORD, FONT_SIZE);
const ELLIPSIS_PX = getLenPx(ELLIPSIS_WORD, FONT_SIZE);
let result = parseSingleExcel(excelDatas[0]);
function parseSingleExcel(excel) {
    const rows = excel.data.length;
    const cols = Math.max.apply(null, excel.data.map((w) => w.length));
    return {
        name: excel.name,
        rows,
        cols,
        data: excel.data,
    };
}
function getLenPx(str, font_size) {
    let str_leng = str.replace(/[^\x00-\xff]/gi, UNIT_WORD).length;
    return (str_leng * font_size) / 2;
}
function handleArrRow(data) {
    data.forEach((item) => {
        item.length > 0 && handleStrPx(item);
    });
}
function handleStrPx(data) {
    data.forEach((item) => {
        let itemPx = getLenPx(item, FONT_SIZE);
    });
}
function getSliceWord(words, itemPx) {
    const wordNum = Math.trunc((itemPx - ELLIPSIS_PX) / UNIT_PX);
    return words.slice(0, wordNum) + ELLIPSIS_WORD;
}
exports.default = excelDatas;
//# sourceMappingURL=index.js.map