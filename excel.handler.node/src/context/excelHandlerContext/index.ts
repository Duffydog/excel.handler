import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";
const excelDatas = xlsx.parse(
  path.resolve(__dirname, "../../../excels/工作簿1.xlsx")
);
parseSingleExcel(excelDatas[0] as excel);

interface excel {
  name: string;
  data: (string | number)[][];
}
function parseSingleExcel(excel: excel) {
  const rows = excel.data.length;
  const cols = Math.max.apply(
    null,
    excel.data.map((w) => w.length)
  );

  console.log(rows, cols);
}
export default excelDatas;
