const Colors = {
    darkmode: `
        --glow: #ff9900;
        --background: #242424;
        --transparant-bg: #242424ab;
        --text: #dadada;
        --red: #b00000;

        --item-type: #ffa07a;
        --item-price: #7fffd4;
        --higher-btn: #90ee90;
        --lower-btn: #f08080;

        --secondary-bg: #313033;
        --secondary-text: #aeaaae;
        --dark-glow: #ff990050;
        --hover: #101010;
        --menuBtn-hover: #606060;
        --block-bg: #959595;
        --block-border: #7d4b01;
    `,
    lightmode: `
        --glow: #ff9900;
        --background: #dadada;
        --transparant-bg: #dadadaab;
        --text: #242424;
        --red: #df0000;

        --item-type: #ff5c1b;
        --item-price: #167a52;
        --higher-btn: #188618;
        --lower-btn: #be2c2c;

        --secondary-bg: #5e5e5e;
        --secondary-text: #e0e0e0;
        --dark-glow: #db8400;
        --hover: #7c7c7c;
        --menuBtn-hover: #7c7c7c;
        --block-bg: #b1b1b1;
        --block-border: #bd7100;
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

