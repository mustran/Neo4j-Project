const fs = require("fs");

const rawdata = fs.readFileSync("../XML to JSON example/JSON-Sample.json");
let json_sample = JSON.parse(rawdata);

function correctKey(attrName) {
    let attrArray = [];
    json_sample.forEach((element, index) => {
        if (element[attrName] != null && attrName == "$") {
            if (typeof element[attrName] == "object") {
                let saveKey = element[attrName].key;
                delete json_sample[index].$;
                json_sample[index].key = saveKey;

                attrArray.push(saveKey);
            }
        }
    });
}

correctKey("$");

let data = JSON.stringify(json_sample);

fs.writeFile("../XML to JSON example/sampleCorrectKey.json", data, err => {
    if (err) console.log(err);
    else {
        // console.log(data);
        console.log("Successfully Written to File.");
    }
});
