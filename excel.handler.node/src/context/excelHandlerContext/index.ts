import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";
import { excel, dataArr, colArr } from "./index.d";

const excelDatas = xlsx.parse(
  path.resolve(__dirname, "../../../excels/工作簿1.xlsx")
);

const FONT_SIZE = 12;

const UNIT_WORD = "aa";

const ELLIPSIS_WORD = "...";

const UNIT_PX = getLenPx(UNIT_WORD, FONT_SIZE);

const ELLIPSIS_PX = getLenPx(ELLIPSIS_WORD, FONT_SIZE);

let result = parseSingleExcel(excelDatas[0] as excel);

function parseSingleExcel(excel: excel) {
  const rows = excel.data.length;
  const cols = Math.max.apply(
    null,
    excel.data.map((w) => w.length)
  );

  return {
    name: excel.name,
    rows,
    cols,
    data: excel.data,
  };
}

function getLenPx(str: string, font_size: number) {
  let str_leng = str.replace(/[^\x00-\xff]/gi, UNIT_WORD).length;
  return (str_leng * font_size) / 2;
}

function handleArrRow(data: dataArr) {
  data.forEach((item) => {
    item.length > 0 && handleStrPx(item);
  });
}

function handleStrPx(data: colArr) {
  data.forEach((item) => {
    let itemPx = getLenPx(item, FONT_SIZE);
  });
}

function getSliceWord(words: string, itemPx: number) {
  const wordNum = Math.trunc((itemPx - ELLIPSIS_PX) / UNIT_PX);
  return words.slice(0, wordNum) + ELLIPSIS_WORD;
}

export default excelDatas;
