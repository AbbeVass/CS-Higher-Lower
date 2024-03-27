const MenuDiv = document.getElementById("weaponsMenu");

let categories;
let items;
fetch(`./../../items/data/categories.json`)
    .then(response => response.json())
    .then(data => {
        categories = data;
        fetch(`./../../items/data/items-data.json`)
        .then(response => response.json())
        .then(data => {
            items = data;
            setup(); // Run the setup after the data is fetched
        })
        .catch(error => console.error('Error fetching items:', error));
    })
    .catch(error => console.error('Error fetching items:', error));

/**
 * Set up the menu with all existing items and their categories
 */
function setup() {
    let catDivs = [];

    // Add items and their respective categories to the weapons menu
    for (item of Object.keys(items)) {
        for (category of Object.keys(categories)) {
            if (categories[category].includes(item)) { // Find the right category
                if (!catDivs.includes(category)) { // Create new div for the category
                    let div = document.createElement("div");
                    div.className = "category";

                    // Create a head to the category
                    let head = document.createElement("div");
                    head.className = "category-head";

                    // Add a title with the category's name
                    let p = document.createElement("p");
                    p.className = "category-name";
                    p.innerHTML = category;
                    head.appendChild(p);
                    
                    // Add a checkbox to the category option
                    head.appendChild(createCheckBox(category));
                    
                    // Add the category to the menu
                    div.appendChild(head)
                    MenuDiv.appendChild(div);
                    catDivs.push(category)
                }
                // Create new div for the item
                let div = document.createElement("div");
                div.className = "item";

                // Add a title with the items's name
                let p = document.createElement("p");
                p.className = "item-name";
                p.innerHTML = item;
                div.appendChild(p);

                // Add a checkbox to the item option
                div.appendChild(createCheckBox(item));

                // Add the item div to the right category parent
                MenuDiv.children[catDivs.findIndex((value) => {
                    return value === category;
                })].appendChild(div);
            }
        }
    }
}

function createCheckBox(value) {
    let box = document.createElement("input");
    box.type = "checkbox";
    box.value = value,
    box.className = "checkbox";
    return box;
}