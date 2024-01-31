const fs = require("fs");
const Path = "../../"

let data = {};
let count = 0

const Dirs = fs.readdirSync(Path).filter(function (dir) {
    return dir !== "data";
});

for (const Dir of Dirs) {
    const Key = Dir
    .replace("CS2", "")     // Remove start of string
    .trim();

    data[Key] = [];

    fs.readdirSync(Path+Dir).forEach(fileName => {
        data[Key].push(getItemData(fileName));
        count++;
    });
}

const DataOutput = JSON.stringify(data, null, 2);
fs.writeFileSync("../items-data.json", DataOutput);
console.log(`Finnished fetching ${count} files`);



function getItemData(s) {
    let item = {};
    item.image = s;

    item.name = s.substring(0, s.indexOf(","));             // Save name
    s = s.replace(item.name+", ", "");                      // Remove name from string
    item.skin = s.substring(0, s.indexOf(","));             // Save skin
    s = s.substring(s.indexOf(",")+1, s.lastIndexOf("k"));  // Remove currency and file type
    s = s.replace(",", ".").replace(/ /g, "");              // Replace decimal character and remove spaces
    item.price = Number(s);                                 // Save price

    if (item.price === null) {
        console.log(`Null--> ${item.name}_${item.skin}_${item.price}`);
    }
    return item;
}
