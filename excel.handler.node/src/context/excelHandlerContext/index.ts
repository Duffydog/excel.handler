import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";
import { excel, dataArr, colArr } from "./index.d";

const excelDatas = xlsx.parse(
  path.resolve(__dirname, "../../../excels/工作簿1.xlsx")
);

export default excelDatas;
