let xml2js = require("xml2js");
let fs = require("fs");

let parser = new xml2js.Parser();
fs.readFile("path to xml file", function(err, data) {
    parser.parseString(data, function(err, result) {
        result = JSON.stringify(result);
        fs.writeFile(__dirname + "/newJsonFile.json", result, function(err) {
            if (err) {
                console.log("ERROR");
            }
            console.log("The file was saved!");
        });
    });
});
