

// Define global variables
let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from local storage or set to 0 if not available
const moleSpeed = 1400; // Time for the mole to appear
let timer;
let array = [];

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
    
    // Add animation to mole
    mole.animate([
        { cy: parseFloat(mole.getAttribute("cy")), offset: 0 },
        { cy: parseFloat(mole.getAttribute("cy")) - 20, offset: 0.5 },
        { cy: parseFloat(mole.getAttribute("cy")), offset: 1 }
    ], {
        duration: 1000,
        iterations: Infinity
    });
    
    document.getElementById("gameArea").appendChild(mole);
    
    // Set timeout to remove 
    setTimeout(() => {
        mole.remove();
        updateHighScore(); // Update high score when mole disappears
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
    score = 0;
    document.getElementById("score").textContent = score;
    timer = setInterval(createMole, moleSpeed);
}

// Function to end game
function endGame() {
    clearInterval(timer);
    alert("Game Over! Your final score is: " + score);
    updateHighScore(); // Update high score at the end of the game
}

// Initialize game
window.onload = () => {
    drawHoles();
    startGame();
    setTimeout(endGame, 20000); // Game will end in 20 seconds
    document.getElementById("high-score").textContent = highScore; // Display initial high score
};

// Function to update high score
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore); 
        document.getElementById("high-score").textContent = highScore; 
    }
}
