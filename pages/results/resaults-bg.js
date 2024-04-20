
const GifsPath = "/resources/img/background-gifs/";
const Gifs = [
    {
        url: GifsPath+"dance.gif",
        phonePosition: "-150px"
    },
    {
        url: GifsPath+"bomb.gif"
    },
    {
        url: GifsPath+"wiggle.gif"
    },
    {
        url: GifsPath+"vibing.gif",
        phonePosition: "-170px"
    },
    {
        url: GifsPath+"walking.gif"
    },
    {
        url: GifsPath+"group-dance.gif"
    },
    
];

// Randomize a background
const BackgroundGif = Gifs[Math.floor(Math.random()*Gifs.length)];
document.body.style.backgroundImage = `url(${BackgroundGif.url})`;

// Change tha backgrounds position if it has a specific position for phone screens
if (BackgroundGif.phonePosition) {
    window.addEventListener("resize", updateBgPosition);
}

function updateBgPosition() {
    if (window.innerWidth < 700) {
        document.body.style.backgroundPosition = BackgroundGif.phonePosition;
    } else {
        document.body.style.backgroundPosition = "center center";
    }
}

updateBgPosition();