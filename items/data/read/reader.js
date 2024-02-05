const fs = require("fs");
const Path = "../../images/"
const Save = "../items-data.json";

let data;
try { data = JSON.parse(fs.readFileSync(Save)); }
catch { data = {}; }

let count = 0;
let idCount = 0;

// Fetch only new directories that includes "CS2"
const Dirs = fs.readdirSync(Path).filter(function (dir) {
    return dir.includes("CS2");
});
console.log("New directories: " + Dirs);

for (const Dir of Dirs) {
    const Key = Dir
    .replace("CS2", "")     // Remove start of string
    .trim();

    data[Key] = [];
    idCount = 0;

    fs.readdirSync(Path+Dir).forEach(fileName => {
        data[Key].push(getItemData(fileName, Dir));
        count++;
        idCount++;
    });

    fs.rename(Path+Dir, Path+Key, (err) => {
        if (err) { throw err; }
        console.log("Renamed dir: " + Key);
    });
}

const DataOutput = JSON.stringify(data, null, 2);
fs.writeFileSync(Save, DataOutput);
console.log("Fetched files: " + count);



function getItemData(s, Dir) {
    let item = {};
    item.string = s;
    item.id = idCount;

    item.type = s.substring(0, s.indexOf(","));             // Save type
    s = s.replace(item.type+", ", "");                      // Remove type from string
    item.skin = s.substring(0, s.indexOf(","));             // Save skin
    s = s.substring(s.indexOf(",")+1, s.lastIndexOf("k"));  // Remove currency and file type
    s = s.replace(",", ".").replace(/ /g, "");              // Replace decimal character and remove spaces
    item.price = Number(s);                                 // Save price

    if (item.price === null) {
        throw `Null--> ${item.type}_${item.skin}_${item.price}`;
    }

    // Rename item
    fs.rename(Path+Dir+"/"+item.string, Path+Dir+"/"+item.id+".webp", (err) => {
        if (err) { throw err; }
    });

    return item;
}
