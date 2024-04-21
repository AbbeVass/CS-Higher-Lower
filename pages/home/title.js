const LinkWhenLong = "The Much Longer Title"
const LinkWhenShort = "The Short Title";

const ShortTitle = "CS2 Higher Lower Game";
const LongTitle = "A Higher Lower Game with CS2 Weapons and their Skins where You have to Guess which one is more Expensive<span class='sub-title'>BASED ON PRICES FROM EARLY 2024</span>";

let currentTitle = "Short";
function changeTitle(customT = null, customL = null) {
    const TitleLink = document.getElementById("title-link");
    const Title = document.getElementById("title");

    if (customT || customL) { // Custom title
        if (customT) { Title.innerText = customT; }
        if (customL) { TitleLink.innerText = customL; }
    }
    else if (currentTitle === "Long") {
        TitleLink.innerText = LinkWhenShort;
        Title.innerHTML = ShortTitle;
        currentTitle = "Short";
    }
    else {
        TitleLink.innerText = LinkWhenLong;
        Title.innerHTML = LongTitle;
        currentTitle = "Long";
    }
}

changeTitle(ShortTitle, LinkWhenShort);