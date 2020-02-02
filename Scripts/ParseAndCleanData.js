const fs = require("fs");

const rawdata = fs.readFileSync("../XML to JSON example/sampleCorrectKey.json");
let databaseNodeToClean = JSON.parse(rawdata);

//GET ALL ATTRIBUTES
const uniqueKeys = new Set();

databaseNodeToClean.forEach(element => {
    let keys = Object.keys(element);
    keys.forEach(elem => {
        uniqueKeys.add(elem);
    });
});

// console.log(uniqueKeys);

function checkAttributesAndReturnString(attrName) {
    databaseNodeToClean.forEach(element => {
        if (element[attrName] != null) {
            element[attrName] = element[attrName][0];
        }
    });
}

function checkAttributesAndParseInt(attrName) {
    databaseNodeToClean.forEach(element => {
        if (element[attrName] != null) {
            element[attrName] = parseInt(element[attrName][0]);
        }
    });
}

function checkObjectsInsideArrays(attrName) {
    databaseNodeToClean.forEach((element, index) => {
        if (element[attrName] != null) {
            if (typeof element[attrName][0] == "object") {
                element[attrName] = element[attrName][0]._;
            } else {
                element[attrName] = element[attrName][0];
            }
        }
    });
}

function correctCite(attrName) {
    databaseNodeToClean.forEach((element, index) => {
        if (element[attrName] != null) {
            if (typeof element[attrName][0] == "object") {
                element[attrName].forEach((ct, index) => {
                    element[attrName][index] = ct._;
                });
            }
        }
    });
}

//call the needed function for all the keys in a JSON document (databaseNodeToClean) ex. article, book
//example: Usage
//checkAttributesAndReturnString("title");
//checkAttributesAndParseInt("year");
//correctCite("cite");

checkAttributesAndReturnString("ee");
checkAttributesAndReturnString("title");
checkAttributesAndReturnString("pages");
checkAttributesAndReturnString("cdrom");
checkAttributesAndReturnString("booktitle");
checkAttributesAndReturnString("crossref");
checkAttributesAndParseInt("year");
correctCite("cite");

let data = JSON.stringify(databaseNodeToClean);

fs.writeFile("../XML to JSON example/JSON-SampleCorrected.json", data, err => {
    if (err) console.log(err);
    else {
        // console.log(data);
        console.log("Successfully Written to File.");
    }
});
