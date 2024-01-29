const IconElement = document.getElementById("icon");
let icon;

const RandomNum = Math.floor(Math.random() * 100);
if      (RandomNum === 0) { icon = "mix"; }   // 1%
else if (RandomNum <= 10) { icon = "gold"; }  // 10%
else if (RandomNum <= 20) { icon = "teal"; }  // 10%
else                      { icon = "white"; } // 79%

IconElement.href = `icons/${icon}.png`;