const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/certy", {
    useNewUrlParser: true,
});

const certySchema = new mongoose.Schema({
    name: String,
    sheetName: String,
    file: Buffer,
    fileName: String,
});

const certyModel = mongoose.model("certificates", certySchema);
module.exports = certyModel;
