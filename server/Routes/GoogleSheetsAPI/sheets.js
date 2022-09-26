const { google } = require("googleapis");

async function googleSheet(url, credFile) {
    // authentication
    const auth = new google.auth.GoogleAuth({
        keyFile: credFile,
        scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
    });
    const client = await auth.getClient();

    // url handling
    const prefix = "https://";
    if (url.substr(0, prefix.length) != prefix) {
        url = prefix + url;
    }
    const spreadsheetId = url.substr(39, 44);
    const workspaceNo = url.substr(93);
    var workspaceId;
    var sheetTitle;
    var sheetData = {};

    // using google sheets api
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //get the title of the spreadsheet
    sheetTitle = metaData.data.properties.title;

    // get the data from spreadsheet
    if (workspaceNo === "sharing") {
        for (var i = 0; i < metaData.data.sheets.length; ++i) {
            workspaceId = metaData.data.sheets[i].properties.title;
            const getRows = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: workspaceId,
            });
            const table = getRows.data.values;
            sheetData[workspaceId] = table;
        }
    } else {
        for (var i = 0; i < metaData.data.sheets.length; i++) {
            if (workspaceNo == metaData.data.sheets[i].properties.sheetId) {
                workspaceId = metaData.data.sheets[i].properties.title;
            }
        }
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: workspaceId,
        });
        const table = getRows.data.values;
        sheetData[workspaceId] = table;
    }

    return { sheetTitle, sheetData };
}

module.exports = { googleSheet };
