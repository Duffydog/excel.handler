import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";
import { excel, dataArr, colArr, excles } from "./index.d";

const excelDatas = xlsx.parse(
  path.resolve(__dirname, "../../../excels/工作簿1.xlsx")
);

export default {
  readExcel(excelNames: string[]) {
    const result: excles = {};
    excelNames.map((name) => {
      result[name] = xlsx.parse(
        path.resolve(__dirname, "../../../public/uploads/" + name)
      ) as excel[];
    });
    return result;
  },
};
