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

let score = 0;
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

    // Set up scores before adding items
    let highScore = localStorage.getItem("highScore");
    if (!highScore) { highScore = 0; }
    document.getElementById("score").innerHTML = "Score: "+score;
    document.getElementById("highScore").innerHTML = "High Score: "+highScore;

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

    // Get elements
    const LeftDisplay = document.querySelector(".left");
    const RightDisplay = document.querySelector(".right");
    const LeftItem = items.left;
    const RightItem = items.right;

    // Left item
    LeftDisplay.querySelector(".item-img").src = `items/img/${LeftItem.type}/${LeftItem.id}.webp`;
    LeftDisplay.querySelector(".item-type").innerHTML = LeftItem.type;
    LeftDisplay.querySelector(".item-skin").innerHTML = LeftItem.skin;
    LeftDisplay.querySelector(".item-price").innerHTML = getPrice(LeftItem.price);

    // Right item
    RightDisplay.querySelector(".item-img").src = `items/img/${RightItem.type}/${RightItem.id}.webp`;
    RightDisplay.querySelector(".item-type").innerHTML = RightItem.type;
    RightDisplay.querySelector(".item-skin").innerHTML = RightItem.skin;
}

function guess(higher) {
    const Box = document.querySelector(".btn-container");

    // Save height
    const BoxHeight = Box.offsetHeight; 

    // Remove buttons
    for (let btn of Box.querySelectorAll("button")) {
        btn.style.display = "none";
    }
    
    // Show price element and adjust its margin so nothing moves
    const Price = Box.querySelector(".item-price");
    Price.style.display = "block";
    Price.style.marginBottom = BoxHeight - Price.offsetHeight + "px";

    // How many updates will the countup consist of
    const Updates = 2 * 30; // seconds * fps
    let frame = 1;

    // Animate the price reveal
    function updatePrice() {
        Price.innerHTML = getPrice(items["right"].price * ((frame) / Updates));
        if (frame === Updates) { // Stop the countup
            clearInterval(countUp);
            guessResult();
        } else {
            frame++;
        }
    }
    let countUp = setInterval(updatePrice, 1000/30);

    function guessResult() {
        // Check if the guess is correct
        const LP = items["left"].price;
        const RP = items["right"].price;
        if ((RP >= LP && higher) || (RP <= LP && !higher)) { // The guess is correct
            
            // Update score
            score++;
            const ScoreDisplay = document.getElementById("score");
            ScoreDisplay.innerHTML = "Score: "+score;
            ScoreDisplay.style.fontSize = "45px";       // Expand
            setTimeout(() => {
                ScoreDisplay.style.fontSize = "32px";   // Retract
            }, 300);

            // Wait and then change items and show buttons again
            setTimeout(() => {
                changeItems();
                Price.style.display = "none";
                for (let btn of Box.querySelectorAll("button")) {
                    btn.style.display = "inline";
                }
            }, 1000);
        }
        else {
            finishGame();
        }
    }
}

/**
 * Rounds the price and returns it in the selected currency
 */
function getPrice(sek) {
    return sek.toFixed(2) + " kr";
}

function finishGame() {

}