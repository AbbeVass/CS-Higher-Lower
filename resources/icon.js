const IconElement = document.getElementById("icon");
const IconsPath = "./../../resources/img/icons/";
const Icons = ["mix.png", "gold.png", "teal.png", "white.png"];

let icon;

if (document.querySelector("title").id === "index"       // If its the index-page
    || !Icons.includes(localStorage.getItem("icon")))    // If there's not a stored icon
{                 

    const RandomNum = Math.floor(Math.random() * 100);
    if      (RandomNum === 0) { icon = "mix.png"; }   // 1%
    else if (RandomNum <= 10) { icon = "gold.png"; }  // 10%
    else if (RandomNum <= 20) { icon = "teal.png"; }  // 10%
    else                      { icon = "white.png"; } // 79%

    localStorage.setItem("icon", icon);
}
else {
    icon = localStorage.getItem("icon");
}

IconElement.href = IconsPath + icon;