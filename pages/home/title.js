const LinkWhenLong = "The Much Longer Title"
const LinkWhenShort = "The Short Title";

const ShortTitle = "CS2 Higher Lower Game";
const LongTitle = "A Higher Lower Game with CS2 Weapons and their Skins where You have to Guess which is more Expensive";

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
        Title.innerText = ShortTitle;
        currentTitle = "Short";
    }
    else {
        TitleLink.innerText = LinkWhenLong;
        Title.innerText = LongTitle;
        currentTitle = "Long";
    }
}

changeTitle(ShortTitle, LinkWhenShort);