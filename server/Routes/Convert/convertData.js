const csvToArray = (csvStr) => {
    csvStr = csvStr.split("\n");
    var i;
    for (i = 0; i < csvStr.length; ++i) {
        csvStr[i] = csvStr[i].split(",");
    }
    return csvStr;
};

module.exports = csvToArray;
