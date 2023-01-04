// import express = require("express");
import express from "express";
import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import bodyParser from "body-parser";
import routers from "./router/index";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api", routers);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
