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
        setup(); // Run the setup after all items are fetched
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

    // Get first item
    items.right = getItem();

    changeItems();
}

function getItem() {
    // Choose type
    const ItemsByType = allItems[possibleItems[Math.floor(Math.random()*possibleItems.length)]];

    // Choose specifik item
    return ItemsByType[Math.floor(Math.random()*ItemsByType.length)];
}

function changeItems() {
    items.left = items.right;

    // Make sure the two items aren't the same
    while (items.right === items.left) {
        items.right = getItem();
    }

    const LeftDisplay = document.querySelector(".left");
    const RightDisplay = document.querySelector(".right");
    const LeftItem = items.left;
    const RightItem = items.right;

    LeftDisplay.querySelector(".item-img").src = `items/images/${LeftItem.type}/${LeftItem.id}.webp`;
    LeftDisplay.querySelector(".item-type").innerHTML = LeftItem.type;
    LeftDisplay.querySelector(".item-skin").innerHTML = LeftItem.skin;
    LeftDisplay.querySelector(".item-price").innerHTML = getPrice(LeftItem.price);

    RightDisplay.querySelector(".item-img").src = `items/images/${RightItem.type}/${RightItem.id}.webp`;
    RightDisplay.querySelector(".item-type").innerHTML = RightItem.type;
    RightDisplay.querySelector(".item-skin").innerHTML = RightItem.skin;
}

function guess(higher) {
    
}

function getPrice(sek) {
    return sek + " kr";
}