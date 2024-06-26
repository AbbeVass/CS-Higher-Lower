const ImgPath = "./../../items/img/";

let settings = JSON.parse(localStorage.getItem("settings"));
if (settings === null) {
    settings = {
        currency: "USD",
        lightmode: false,
        items: "All items"
    }
}

let allItems;
fetch(`./../../items/data/items-data.json`)
    .then(response => response.json())
    .then(data => {
        allItems = data;
        setup(); // Run the setup after all items are fetched
    })
    .catch(error => console.error('Error fetching items:', error));

let score = 0;
let items = {left: {}, right: {}};
let possibleItems = []; // Only the keys

/**
 * Set up the page
 */
function setup() {
    // Add choosen items if the stored settings are correct
    if (typeof settings.items === "object") {
        for (let item of settings.items) {
            if (Object.keys(allItems).includes(item)) {
                possibleItems.push(item);
            }
        }
    }
    else { // Set all items as possible
        possibleItems = Object.keys(allItems);
    }

    // Get first item
    items.right = getItem();

    // Set up scores before adding items
    // There's only a high score if all weapons are in play
    if (settings.items === "All items") {
        let highScore = localStorage.getItem("highScore");
        if (!highScore) { highScore = 0; }
        document.getElementById("highScore").innerHTML = "High Score: "+highScore;
    }
    document.getElementById("score").innerHTML = "Score: "+score;

    changeItems();
}

/**
 * Get a new random item
 * @returns A item object
 */
function getItem() {
    // Choose type
    const ItemsByType = allItems[possibleItems[Math.floor(Math.random()*possibleItems.length)]];

    // Choose specifik item
    return ItemsByType[Math.floor(Math.random()*ItemsByType.length)];
}

/**
 * Chenges the items for a new guess
 */
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
    LeftDisplay.querySelector(".item-img").src = ImgPath+`${LeftItem.type}/${LeftItem.id}.webp`;
    LeftDisplay.querySelector(".item-type").innerHTML = LeftItem.type;
    LeftDisplay.querySelector(".item-skin").innerHTML = LeftItem.skin;
    LeftDisplay.querySelector(".item-price").innerHTML = getPrice(LeftItem.price);

    // Right item
    RightDisplay.querySelector(".item-img").src = ImgPath+`${RightItem.type}/${RightItem.id}.webp`;
    RightDisplay.querySelector(".item-type").innerHTML = RightItem.type;
    RightDisplay.querySelector(".item-skin").innerHTML = RightItem.skin;

    // Check each image's size properties when their loaded
    document.querySelectorAll(".item-img").forEach((img) => {
        img.alt = RightItem.type + " - " + RightItem.skin;

        function imgLoaded() {
            img.style.width = "auto";
            img.style.height = "100%";
    
            // If the image is too wide its size depends on the display's width instead of height 
            if (img.offsetWidth > LeftDisplay.offsetWidth) {
                img.style.height = "auto";
                img.style.width = "100%";
            }
        }
    
        if (img.complete) {
            imgLoaded();
        } else {
            img.addEventListener('load', imgLoaded);
        }
    });
}

/**
 * Makes a guess whether the right item
 * is higher or lower than the right item
 * @param {boolean} higher 
 */
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
    const FPS = 30;
    const Updates = 1.5 * FPS; // seconds * fps
    let frame = 1;

    // Animate the price reveal
    function updatePrice() {
        Price.innerHTML = getPrice(items.right.price * (frame / Updates));
        if (frame === Updates) { // Stop the countup
            clearInterval(countUp);
            guessResult();
        } else {
            frame++;
        }
    }
    let countUp = setInterval(updatePrice, 1000/FPS);

    function guessResult() {
        // Check if the guess is correct
        const LP = items.left.price;
        const RP = items.right.price;
        if ((RP >= LP && higher) || (RP <= LP && !higher)) { // The guess is correct
            
            // Update score
            score++;
            const ScoreDisplay = document.getElementById("score");
            ScoreDisplay.innerHTML = "Score: "+score;

            const ScoreFonstSize = window.getComputedStyle(ScoreDisplay).getPropertyValue('font-size');
            ScoreDisplay.style.fontSize = parseFloat(ScoreFonstSize)*2 + "px"; // Expand
            setTimeout(() => {
                ScoreDisplay.style.fontSize = ScoreFonstSize;                  // Retract
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
    switch (settings.currency) {
        case "EUR":
            return (sek/11.301).toFixed(2) + " &#8364;";
        case "SEK":
            return sek.toFixed(2) + " kr";
        default: // USD
            return "&#36;" + (sek/10.476).toFixed(2);
    }
}

/**
 * Save the score,
 * fade the background
 * and open the results page
 */
function finishGame() {
    localStorage.setItem("score", score);
    
    const FadingTime = 2000;
    const BodyStyle = document.body.style;
    BodyStyle.transition = FadingTime/1000 + "s";
    BodyStyle.backgroundColor = "var(--red)";

    // Wait before opening the result page
    setTimeout(() => {
        window.open("./../results/results.html", "_self");
    }, FadingTime);
}