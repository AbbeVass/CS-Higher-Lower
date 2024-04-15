const Colors = {
    darkmode: `
        --glow: #ff9900;
        --background: #242424;
        --text: #dadada;
        --red: #b00000;
        --secondary-bg: #313033;
        --secondary-text: #aeaaae;
        --dark-glow: #ff990050;
        --dark-bg: #1c1c1c;
        --block-bg: #6e6e6e;
        --block-border: #7d4b01;
    `,
    lightmode: `
        --glow: #ff9900;
        --background: #dadada;
        --text: #242424;
        --red: #b00000;
        --secondary-bg: #313033;
        --secondary-text: #aeaaae;
        --dark-glow: #ff990050;
        --dark-bg: #1c1c1c;
        --block-bg: #919191;
        --block-border: #7d4b01;
    `
}

try {
    setLightmode(JSON.parse(localStorage.getItem("settings")).lightmode);
} catch {
    setLightmode(false); // Default
}

/**
 * Set lightmode 
 * @param {boolean} ligth true: lightmode, false: darkmode
 */
function setLightmode(light) {
    const Mode = light ? "lightmode" : "darkmode";
    const Root = document.querySelector(":root");
    Root.style.cssText = Colors[Mode];
}

