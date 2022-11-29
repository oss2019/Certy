const express = require("express");
const router = express.Router();
const multer = require("multer");
const { spawnSync } = require("child_process");
const zipLocal = require("zip-local");
const fs = require("fs");
const upload = multer();
const createError = require("http-errors");
const google = require("./GoogleSheetsAPI/sheets");



router.use(express.urlencoded({extended:true}));

router.post("/", upload.none(), async (req, res, next) => {
    const url = req.body.link;
    const template_id = req.body.templateID;
    const creds = "./Routes/GoogleSheetsAPI/creds.json";

    try {
        //get spreadsheet data and convert to json
        const data = await google.googleSheet(url, creds);
        fs.writeFileSync(
            "Temp/" + data.sheetTitle + ".json",
            JSON.stringify(data.sheetData),
            "utf-8"
        );

        //Run python script to create certificates
        spawnSync("python", ["main.py", data.sheetTitle, template_id]);

        //delete the json file
        fs.unlinkSync("Temp/" + data.sheetTitle + ".json");

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
        error.status = 404;
        next(error);
    }
});

module.exports = router;
