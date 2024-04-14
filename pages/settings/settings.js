// Get current settings
let settings;
try {
    settings = JSON.parse(localStorage.getItem("settings"));
} catch {
    settings = {currency: "USD", lightmode: false, items: "All items"};
}
let allItems = settings.items === "All items" ? true: false;

/**
 * Make a change in the local storage
 * @param {String} setting The setting that has been updated: "currency", "lighmode" or "items"
 * @param {*} value The value to store as the new setting
 */
function saveSettings(setting, value) {
    settings[setting] = value;
    localStorage.setItem("settings", JSON.stringify(settings));
}

// Set the lightmode switch to the correct position
const LightSwitch = document.getElementById("lightSwitch");
LightSwitch.checked = settings.lightmode;

// Add an event listener to the lightmode switch
LightSwitch.addEventListener("change", (event) => {
    setLightmode(event.target.checked);
    saveSettings("lightmode", event.target.checked);
});

/**
 * Verify and reset the high score
 */
function resetHighScore() {
    if (confirm("Are you sure that you want to Reset the High Score back to 0?")) {
        localStorage.setItem("highScore", 0);
    }
}