"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const node_xlsx_1 = __importDefault(require("node-xlsx"));
// const abc = __dirname;
const abc = node_xlsx_1.default.parse(path_1.default.resolve(__dirname, "../../../excels/工作簿1.xlsx"));
exports.default = abc;
