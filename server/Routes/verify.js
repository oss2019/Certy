const express = require("express");
const router = express.Router();
const fs = require("fs");
const certyModel = require("./MongoDB/certificate");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res, next) => {
    const certy_id = req.query.uid;
    try {
        const certificate = await certyModel.findById(certy_id);
        if (!certificate) {
            throw createError(404, "Certificate with this ID does not Exists");
        }
        fs.writeFileSync("Temp/" + certificate.fileName, certificate.file);
        const stream = fs.createReadStream("Temp/" + certificate.fileName);
        stream.pipe(res).once("close", () => {
            stream.destroy();
            fs.unlinkSync("Temp/" + certificate.fileName);
        });
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, "Invalid Certificate ID"));
            return;
        }
        next(error);
    }
});

module.exports = router;
