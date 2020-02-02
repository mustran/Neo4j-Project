const fs = require("fs");

const rawdata = fs.readFileSync("articleFinalEE.json");
let article = JSON.parse(rawdata);

let countCite = 0;
function correctCite(attrName) {
    article.forEach((element, index) => {
        if (element[attrName] != null) {
            element[attrName].forEach((ct, index) => {
                if (typeof ct == "object") {
                    countCite++;
                    console.log(ct);
                    element[attrName][index] = ct._;
                    console.log(element[attrName][index]);
                }
            });
        }
    });
}

correctCite("cite");
console.log(countCite);

let data = JSON.stringify(article);

fs.writeFile("articleFinalEECite.json", data, err => {
    if (err) console.log(err);
    else {
        console.log("Successfully Written to File.");
    }
});


