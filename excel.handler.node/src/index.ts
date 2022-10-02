// import express = require("express");
import express from "express";
import routers from "./router/index";
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api", routers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
