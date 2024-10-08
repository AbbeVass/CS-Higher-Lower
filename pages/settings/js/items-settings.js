const MenuDiv = document.getElementById("weaponsMenu");
const DataPath = "./../../items/data/"; // Path from html file

// Get all items and the category structure
let categories;
let categoryKeys;
let items;
fetch(DataPath + "categories.json")
    .then(response => response.json())
    .then(data => {
        categories = data;
        categoryKeys = Object.keys(categories);
        fetch(DataPath + "items-data.json")
        .then(response => response.json())
        .then(data => {
            items = data;
            setup(); // Run the setup after the data is fetched
        })
        .catch(error => console.error("Error fetching items:", error));
    })
    .catch(error => console.error("Error fetching items:", error));

/**
 * Set up the menu with all existing items and their categories
 */
function setup() {
    let catDivs = [];

    // Add items and their respective categories to the weapons menu
    for (item of Object.keys(items)) {
        for (category of categoryKeys) {
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
                    div.appendChild(head);
                    MenuDiv.appendChild(div);
                    catDivs.push(category);
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

    // Add event listeners for all items checkboxes
    let checkboxes = document.querySelectorAll(".checkbox");
    let selectedItems = [];
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            checkboxEvent(checkbox, true);
        });
        
        // Last, display the current item selection
        if (settings.items === "All items"
            || (settings.items).includes(checkbox.value)) {
            
            checkbox.checked = true;
            checkboxEvent(checkbox, false);
        }
    });

    function checkboxEvent(checkbox, save) {
        // Update checkboxes
        updateItemSelection(Array.from(checkboxes), checkbox);
        selectedItems = 
            Array.from(checkboxes)  // Convert checkboxes to an array
            .filter(i => i.checked) // Remove unchecked checkboxes
            .map(i => i.value);     // Get the remaining checkbox values
        updateBtnDisplay(selectedItems);
    
        // Save changes
        if (save) {
            saveSettings("items", allItems?
                "All items":
                selectedItems.filter(i => !categoryKeys.includes(i))
            );
        }
    }
}

/**
 * Creates a checkbox that can be customized
 * @param {String} value The checkbox's value
 * @returns A customizable checkbox element
 */
function createCheckBox(value) {
    let label = document.createElement("label");
    label.className = "container";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.className = "checkbox";
    input.value = value;

    let span = document.createElement("span");
    span.className = "checkmark";

    label.appendChild(input);
    label.appendChild(span);
    return label;
}

/**
 * Updates the checkboxes for the weapons selection
 * so the category checkbox reflects the selected items
 */
function updateItemSelection(allBoxes, clickedBox) {

    // If a category was clicked
    // Change all those items to the same state
    if (categoryKeys.includes(clickedBox.value)) {
        for (box of allBoxes) {
            if (categories[clickedBox.value].includes(box.value)) {
                if (clickedBox.checked) {
                    box.checked = true;
                } else {
                    box.checked = false;
                }
            }
        }
    }
    
    // If an item was clicked
    // Check if the category checkbox should change state
    else {
        for (category of categoryKeys) {
            if (categories[category].includes(clickedBox.value)) { // Find the item's category
                if (!clickedBox.checked) {
                    document.querySelector(`input[value="${category}"]`).checked = false;;
                } else {
                    // Change the category checkbox if all items of the category are checked
                    for (boxValue of categories[category]) {
                        const Box = document.querySelector(`input[value="${boxValue}"]`); // Returns null if the item isn't in the game
                        if (Box !== null && !Box.checked) {
                            return;
                        }
                    }
                    document.querySelector(`input[value="${category}"]`).checked = true;
                }
                break;
            }
        }
    }
}

/**
 * Update the text that displays the selected weapons
 * @param {Array} selectedItems 
 */
function updateBtnDisplay(selectedItems) {
    let output = [];
    
    // Add selected categories
    output.push(
        selectedItems.filter(i => categoryKeys.includes(i))
    );

    // Check if all categories are selected or if no item are selected
    // Because then all items are selected
    if (output[0].length === document.querySelectorAll(".category").length
        || selectedItems.length === 0) {
        output = "All weapons";
        allItems = true;
    }
    else {
        // Add selected weapons outside of the selected categories
        for (category of categoryKeys) {
            if (!selectedItems.includes(category)) {
                output.push(
                    selectedItems.filter(i => categories[category].includes(i))
                );
            }
        }
        // Create a string
        output = output.flat().join(" / ");
        allItems = false;
    }

    // Update text
    document.getElementById("selectedWeapons").innerHTML = output;
}

// Listen for the menu section being clicked
document.getElementById("menuBtn").addEventListener("click", () => {
    if (MenuDiv.style.display !== "initial") {
        MenuDiv.style.display = "initial";
    } else {
        MenuDiv.style.display = "none";
    }
});
