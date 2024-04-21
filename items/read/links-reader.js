const fs = require("fs");
const Save = "./../data/items-data.json";

let linksArray = fs.readFileSync("./links-input.txt", "utf-8").split("\r\n");
let data = JSON.parse(fs.readFileSync(Save));

let item;
for (line of linksArray) {
    if (line[0] === "-") { // New item
        if (item) { console.log(item + " Done"); }
        item = line.substring(1, line.length);
    } else {
        if (line.length === 36 || line.length === 37) {

            const LinkID = line[31] === "." ? line[30] : line.substring(30, 32);
            for (skin of data[item]) {
                if (skin.id == LinkID) {
                    skin.link = line;
                }
            }

        } else {
            console.log("Following line is not 36 or 37 characters long:");
            console.log(line);
            process.exit();
        }
    }
}

console.log(item + " Done");

const DataOutput = JSON.stringify(data, null, 2);
fs.writeFileSync(Save, DataOutput);
console.log("\n----------\nitems-data.json is updated");