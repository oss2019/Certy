const express = require("express");
const router = express.Router();
const multer = require("multer");
const { spawnSync } = require("child_process");
const zipLocal = require("zip-local");
const fs = require("fs");
const XLSX = require("xlsx");
const createError = require("http-errors");
const ZipModel = require("./MongoDB/certy_zips");
const csvToArray = require("./Convert/convertData");

//create storage for uploaded files
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({
    storage: storage,
});

router.post("/", upload.single("excel"), async (req, res, next) => {
    const template_id = req.body.templateID;
    const workbook = XLSX.readFile("upload/" + req.file.originalname);
    const sheet_name_list = workbook.SheetNames;
    const data = {
        sheetTitle: req.file.originalname.substring(
            0,
            req.file.originalname.indexOf(".")
        ),
        sheetData: {},
    };
    sheet_name_list.map((sheet_name) => {
        var csv_string = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name]);
        data.sheetData[sheet_name] = csvToArray(csv_string);
    });

    try {
        //save data as json file
        fs.writeFileSync(
            "Temp/" + data.sheetTitle + ".json",
            JSON.stringify(data.sheetData),
            "utf-8"
        );

        //Run python script to create certificates
        spawnSync("python", ["main.py", data.sheetTitle, template_id]);
        
        //delete the json file
        fs.unlinkSync("Temp/" + data.sheetTitle + ".json");
        fs.unlinkSync("upload/" + req.file.originalname);

        const savePath = "Temp/" + data.sheetTitle + ".zip";
        zipLocal.sync.zip("Output/" + data.sheetTitle).compress().save(savePath);
        
        //Remove the temporary files
        fs.rmSync("Output/" + data.sheetTitle, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        });
        //set the response filename
        res.setHeader('Access-Control-Expose-Headers','Content-Disposition');
        res.setHeader(
            "Content-disposition",
            "attachment; filename=" + data.sheetTitle + ".zip"
        );


        const stream = fs.createReadStream(savePath);
        stream.pipe(res).once("close", () => {
            stream.destroy();
            fs.unlinkSync(savePath);
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
