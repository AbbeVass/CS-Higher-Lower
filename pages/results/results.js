const Score = localStorage.getItem("score");

// If there's not a score from a completed game
if (!Score) {
    alert("Could not find a completed game. You will be directed to the home page.");
    window.open("./../home/home.html", "_self");
}

// Get the high score if all weapons are in play
if (JSON.parse(localStorage.getItem("settings")).items === "All items") {
    
    let highScore = localStorage.getItem("highScore");
    if (isNaN(highScore) || highScore === null) { highScore = 0; }

    if (Number(Score) > Number(highScore)) { // New high score
        highScore = Score;
        localStorage.setItem("highScore", highScore);
        
        document.getElementById("score").remove();
        document.getElementById("highScore").innerHTML = "New High Score: "+highScore;
    } else {
        document.getElementById("score").innerHTML = "Score: "+Score;
        document.getElementById("highScore").innerHTML = "High Score: "+highScore;
    }
} else {
    document.getElementById("highScore").remove();
    document.getElementById("score").innerHTML = "Score: "+Score;
}
