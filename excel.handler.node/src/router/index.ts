import express from "express";
import multer from "multer";
import path from "path";
import excelHandler from "../context/excelHandlerContext/index";

let excelsName: string[] = [];

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const filename = `upload-${Date.now()}.${file.originalname.split(".")[1]}`;
    excelsName.push(filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });
// const storage = multer.memoryStorage();
// const upload = multer({storage})

const router = express.Router();

router.get("/", function (req, res) {
  res.send("AAA");
});

router.post("/uploadExcel", upload.array("excels"), function (req, res) {
  const data = excelHandler.readExcel(excelsName);
  // throw new Error("cowu");
  excelsName = [];
  res.send(data);
});

router.get("/about", function (req, res) {
  res.send("About birds");
});

export default router;
