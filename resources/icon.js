const IconElement = document.getElementById("icon");
const IconsPath = "./../../resources/img/icons/";
const Icons = [
    "mix.png",
    "gold.png",
    "teal.png",
    "white.png"
];

let icon;

if (document.querySelector("title").id === "index"       // If its the index-page
    || !Icons.includes(localStorage.getItem("icon")))    // If there's not a stored icon
{                 

    const RandomNum = Math.floor(Math.random() * 100);
    if      (RandomNum === 0) { icon = Icons[0]; } // 1%
    else if (RandomNum <= 10) { icon = Icons[1]; } // 10%
    else if (RandomNum <= 20) { icon = Icons[2]; } // 10%
    else                      { icon = Icons[3]; } // 79%

    localStorage.setItem("icon", icon);
}
else {
    icon = localStorage.getItem("icon");
}

IconElement.href = IconsPath + icon;