const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const app = express();

//Allow cross origin requests
app.use(cors());

//Routes
const certy_link = require("./Routes/certy_googlesheets");
const certy_upload = require("./Routes/certy_upload");
const verification = require("./Routes/verify");
app.use("/certy_googleSheet", certy_link);
app.use("/certy_upload", certy_upload);
app.use("/verify", verification);

// If invalid route is selected
app.use((req, res, next) => {
    next(createError(404, "Not Found"));
});

//Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(5000, () => {
    console.log("Server started at port 5000");
});
