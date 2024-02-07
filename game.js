let settings;
fetch(`settings.json`)
    .then(response => response.json())
    .then(data => {
        settings = data;
    })
    .catch(error => console.error('Error fetching settings:', error));

let allItems;
fetch(`items/data/items-data.json`)
    .then(response => response.json())
    .then(data => {
        allItems = data;
        setup(); // Run the setup after all items har fetched
    })
    .catch(error => console.error('Error fetching items:', error));


let items = {left: {}, right: {}};
let possibleItems = []; // Only the keys

function setup() {
    if (settings.items) {
        for (let item of settings.items) {
            possibleItems.push(item);
        }
    }
    else { // If there's no settings, all items will be set as possible
        possibleItems = Object.keys(allItems);
    }

    // Get items
    items.left = getItem();
    items.right = getItem();
    while (items.right === items.left) {
        items.right = getItem();
    }
}

function getItem() {
    // Choose type
    const ItemsByType = allItems[possibleItems[Math.floor(Math.random()*possibleItems.length)]];

    // Choose specifik item
    return ItemsByType[Math.floor(Math.random()*ItemsByType.length)];
}