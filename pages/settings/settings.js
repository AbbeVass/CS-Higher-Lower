// Get current settings
let settings;
try {
    settings = JSON.parse(localStorage.getItem("settings"));
} catch {
    settings = {currency: "Dollar", lightmode: false, items: "All items"};
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