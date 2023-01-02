"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../context/excelHandlerContext/index"));
const router = express_1.default.Router();
console.log(index_1.default);
router.get("/", function (req, res) {
    res.send("AAA");
});
router.get("/about", function (req, res) {
    res.send("About birds");
});
exports.default = router;
//# sourceMappingURL=index.js.map