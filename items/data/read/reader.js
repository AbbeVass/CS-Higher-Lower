const fs = require("fs");
const Path = "../../"

let data = {};

const Dirs = fs.readdirSync(Path).filter(function (dir) {
    return dir !== "data";
});

for (const Dir of Dirs) {
    const Key = Dir
    .replace("CS2", "")
    .trim();

    data[Key] = [];

    fs.readdirSync(Path+Dir).forEach(fileName => {
        data[Key].push(getItemData(fileName));
    });
}

const DataOutput = JSON.stringify(data, null, 2);
fs.writeFileSync("../items-data.json", DataOutput);



function getItemData(s) {
    let item = {};

    item.name = s.substring(0, s.indexOf(","));             // Save name
    s = s.replace(item.name+", ", "");                      // Remove name from string
    item.skin = s.substring(0, s.indexOf(","));             // Save skin
    s = s.substring(s.indexOf(",")+1, s.lastIndexOf("k"));  // Remove currency and file type
    s = s.replace(",", ".").replace(/ /g, "");              // Replace decimal character and remove spaces
    item.price = Number(s);                                 // Save price

    console.log(item.name +"---"+ item.skin +"---"+ item.price);
    return item;
}
