let colors;
fetch(`/resources/colors.json`)
    .then(response => response.json())
    .then(data => {
        colors = data;
        try {
            setLightmode(JSON.parse(localStorage.getItem("settings")).lightmode);
        } catch {
            setLightmode(false); // Default
        }
    })
    .catch(error => console.error('Error fetching items:', error));

/**
 * Set lightmode 
 * @param {boolean} ligth true: lightmode, false: darkmode
 */
function setLightmode(light) {
    const Mode = light ? "lightmode" : "darkmode";
    const Root = document.querySelector(":root");
    Root.style.cssText = colors[Mode];
}