// Get canvas element and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Get speed slider element and value span
var speedSlider = document.getElementById("speed");
var speedValue = document.getElementById("speed-value");

// Get start and pause button elements
var startButton = document.getElementById("start-button");
var pauseButton = document.getElementById("pause-button");

// Define the snake object
var snake = {
    x: 0,
    y: 0,
    dx: 10,
    dy: 0,
    cells: [], // An array that will contain the body of the snake
    maxCells: 4, // The initial length of the snake
    speed: 5 // The initial speed of the snake
};

// Define the food object
var food = {
    x: 0,
    y: 0
};

// Generate random coordinates for the food
function getRandomCoord() {
    return Math.floor(Math.random() * (canvas.width / 10)) * 10;
}

// Update the position of the snake
function updateSnake() {
    // Move the snake by adding a new head and removing the tail
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Add the new head to the front of the snake's body
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Remove the tail of the snake's body if it has exceeded the maximum length
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}

// Check if the snake has collided with the walls or itself
if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    gameOver();
}
for (var i = 1; i < snake.cells.length; i++) {
    if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
        gameOver();
        break;
    }
}

// Check if the snake has eaten the food
if (snake.x === food.x && snake.y === food.y) {
    // Increase the length of the snake
    snake.maxCells++;

    // Generate new coordinates for the food
    food.x = getRandomCoord();
    food.y = getRandomCoord();
}

// Draw the snake and the food
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the snake
    ctx.fillStyle = "green";
    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, 10, 10);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// The main game loop
function loop() {
    // Update the position of the snake
    updateSnake();
    // Draw the snake and the food
    draw();

    // Set the game loop to run again after a certain amount of time based on the speed of the snake
    setTimeout(function () {
        requestAnimationFrame(loop);
    }, 1000 / snake.speed);
}

// Start the game
function startGame() {
    // Reset the snake and the food
    snake.x = 0;
    snake.y = 0;
    snake.cells = [];
    snake.maxCells = 4;
    snake.speed = parseInt(speedSlider.value);
    snake.dx = 10;
    snake.dy = 0;
    food.x = getRandomCoord();
    food.y = getRandomCoord();
    // Set up the UI
    speedValue.textContent = snake.speed;
    startButton.style.display = "none";
    pauseButton.style.display = "inline-block";

    // Start the game loop
    loop();
}

// Pause the game
function pauseGame() {
    // Stop the game loop
    cancelAnimationFrame(loop);
    // Set up the UI
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
}

// End the game
function gameOver() {
    // Stop the game loop
    cancelAnimationFrame(loop);
    // Set up the UI
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    alert("Game over!");
}

// Add event listeners for the speed slider and the start and pause buttons
speedSlider.addEventListener("input", function () {
    snake.speed = parseInt(speedSlider.value);
    speedValue.textContent = snake.speed;
});

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);