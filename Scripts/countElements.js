const fs = require("fs");

const rawdata = fs.readFileSync("json file to scan");
let jsonFileToScan = JSON.parse(rawdata);

//GET ALL ATTRIBUTES
const uniqueKeys = new Set();

jsonFileToScan.forEach(element => {
    let keys = Object.keys(element);
    keys.forEach(elem => {
        uniqueKeys.add(elem);
    });
});

//spread attributes into array
const uniqueKeysAsArray = [...uniqueKeys];

//loop through elements
for (let i = 0; i < uniqueKeysAsArray.length; i++) {
    let countElement = 0;
    let countNotNull = 0;
    //scan file for each attribute  and count
    jsonFileToScan.forEach(element => {
        if (element[uniqueKeysAsArray[i]] == null) {
            countElement++;
        } else {
            countNotNull++;
        }
    });

    console.log(
        `COUNT: ${uniqueKeysAsArray[i]} \tNULL: ${countElement} \tNOT NULL: ${countNotNull}`
    );
}
