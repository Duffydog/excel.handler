import express from "express";
import abc from "../context/excelHandlerContext/index";

const router = express.Router();

console.log(abc);

router.get("/", function (req, res) {
  res.send("AAA");
});

router.get("/about", function (req, res) {
  res.send("About birds");
});

export default router;
