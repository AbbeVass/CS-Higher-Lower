
const GifsPath = "./img/background-gifs/";
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
    }
];

// Randomize a background
const BackgroundGif = Gifs[Math.floor(Math.random()*Gifs.length)];

document.addEventListener("DOMContentLoaded", () => {

    // Change tha backgrounds position if it has a specific position for phone screens
    if (window.innerWidth < 700) {
        try {
            document.body.style.backgroundPosition = BackgroundGif.phonePosition;
        } catch {}
    }

    // Set the background
    document.body.style.backgroundImage = `url(${BackgroundGif.url})`;
});