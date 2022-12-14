"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express = require("express");
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const app = (0, express_1.default)();
const port = 3000;
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/api", index_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map