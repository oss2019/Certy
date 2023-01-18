const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/certy", {
    useNewUrlParser: true,
});

const fileSchema = new mongoose.Schema({
    name: String,
    path: String,
});

const ZipModel = mongoose.model("certy_zips", fileSchema);
module.exports = ZipModel;
