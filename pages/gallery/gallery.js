const DataPath = "./../../items/data/";
const ImgPath = "./../../items/img/"
let items;
fetch(DataPath + "items-data.json")
    .then(response => response.json())
    .then(data => {
        items = data;
        setup(); // Run the setup after the data is fetched
    })
    .catch(error => console.error("Error fetching items:", error));


function setup() {
    const Keys = Object.keys(items);
    for (item of Keys) {
        for (skin of items[item]) {
            let image = document.createElement("img");
            image.src = ImgPath+item+"/"+skin.id+".webp";
            image.style.width = "100px";
            document.querySelector("main").appendChild(image);
        }
    }
}