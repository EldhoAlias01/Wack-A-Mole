let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let moleSpeed;
let timer;
let array = [];
let duration;
let highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Load high scores from localStorage

// Function to retrieve selected difficulty level
function difficultyLevels() {
    const levels = document.querySelectorAll('input[name="level"]');
    for (const level of levels) {
        if (level.checked) {
            return level.id;
        }
    }
}

// Function to set mole speed based on difficulty
function speed() {
    const difficulty = difficultyLevels();
    if (difficulty === "easy") {
        return moleSpeed = 1400;
    } else if (difficulty === "medium") {
        return moleSpeed = 800;
    } else {
        return moleSpeed = 500;
    }
}

// Function to create holes
function drawHoles() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const hole = document.getElementById("circle1").cloneNode(true);
            hole.setAttribute("cx", 100 + j * 150);
            hole.setAttribute("cy", 100 + i * 120);
            hole.classList.add("hole");
            document.getElementById("gameArea").appendChild(hole);
            array.push(hole);
        }
    }
}

// Function to create mole
function createMole() {
    const randomIndex = Math.floor(Math.random() * array.length);
    const moleHole = array[randomIndex];
    const mole = document.getElementById("circle2").cloneNode(true);
    mole.setAttribute("cx", moleHole.getAttribute("cx"));
    mole.setAttribute("cy", moleHole.getAttribute("cy"));
    mole.classList.add("mole");
    mole.addEventListener("click", hit);

    mole.animate([
        { cy: parseFloat(mole.getAttribute("cy")), offset: 0 },
        { cy: parseFloat(mole.getAttribute("cy")) - 30, offset: 0.5 },
        { cy: parseFloat(mole.getAttribute("cy")), offset: 1 }
    ], {
        duration: 1000,
        iterations: Infinity
    });

    document.getElementById("gameArea").appendChild(mole);

    setTimeout(() => {
        mole.remove();
        // updateHighScore(); // Update high score when mole disappears
    }, moleSpeed);
}

// Function to handle mole whacking
function hit(event) {
    const mole = event.target;
    mole.remove();
    score += 10;
    document.getElementById("score").textContent = score;
}

// Function to start game
function startGame() {
    const playerName = document.getElementById("playerName").value;
    if (!playerName) {
        alert("Please enter your name to start the game!");
        return;
    }

    score = 0;
    document.getElementById("score").textContent = score;
    moleSpeed = speed();
    timer = setInterval(createMole, moleSpeed);
    setTimeout(endGame, 30000); // End the game after 30 seconds
}

// Function to end game
function endGame() {
    clearInterval(timer);
    alert("Game Over! Your final score is: " + score);
    updateHighScore();
}

// Function to update high score
function updateHighScore() {
    const playerName = document.getElementById("playerName").value;

    // Add the new score to the high score list
    highScores.push({ name: playerName, score });

    // Sort the high scores in descending order based on the score
    highScores.sort((a, b) => b.score - a.score);

    // Only keep the top 5 high scores
    highScores = highScores.slice(0, 5);

    // Store the updated high scores in localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Update the high score display table
    const highScoreTableBody = document.getElementById("highScoreTable").querySelector("tbody");

    // Clear the existing rows in the table
    highScoreTableBody.innerHTML = ""; 

    // Iterate over all high scores and add them to the table
    highScores.forEach(scoreEntry => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${scoreEntry.name}</td><td>${scoreEntry.score}</td>`;
        highScoreTableBody.appendChild(row);
    });
}


function resetHighScores() {
    // Remove the high score and high score list from localStorage
    localStorage.removeItem("highScore");
    localStorage.removeItem("highScores");

    // Reset high score variables
    highScore = 0;
    highScores = [];

    // Update the UI
    document.getElementById("high-score").textContent = highScore;
    const highScoreTableBody = document.getElementById("highScoreTable").querySelector("tbody");
    highScoreTableBody.innerHTML = ""; // Clear the table

    alert("High scores have been reset!");
}

// Initialize game
window.onload = () => {
    drawHoles();
    document.getElementById("high-score").textContent = highScore; // Display initial high score
    // updateHighScore(); // Populate the high score table from localStorage
};

