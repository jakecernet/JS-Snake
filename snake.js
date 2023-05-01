// Get canvas element and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define the snake object
var snake = {
    x: 0,
    y: 0,
    dx: 10,
    dy: 0,
    cells: [], // An array that will contain the body of the snake
    maxCells: 4 // The initial length of the snake
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

// Draw the snake on the canvas
function drawSnake() {
    ctx.fillStyle = "green";
    // Draw the head of the snake
    ctx.fillRect(snake.x, snake.y, 10, 10);
    // Loop through the snake's body and draw each cell
    for (var i = 0; i < snake.cells.length; i++) {
        ctx.fillRect(snake.cells[i].x, snake.cells[i].y, 10, 10);
    }
}

// Generate random coordinates for the food
function generateFood() {
    food.x = getRandomCoord();
    food.y = getRandomCoord();
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Check for collisions between the snake and the food
function checkFoodCollision() {
    if (snake.x === food.x && snake.y === food.y) {
        snake.maxCells++;
        generateFood();
    }
}

// Check for collisions between the snake and the walls
function checkWallCollision() {
    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        reset();
    }
}

// Check for collisions between the snake and itself
function checkSelfCollision() {
    for (var i = 1; i < snake.cells.length; i++) {
        if (snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
            reset();
        }
    }
}

// Reset the game
function reset() {
    snake.x = 0;
    snake.y = 0;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = 10;
    snake.dy = 0;
    generateFood();
}

// Handle keydown events to change the direction of the snake
document.addEventListener("keydown", function (e) {
    // Prevent the snake from reversing
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -10;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -10;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = 10;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = 10;
        snake.dx = 0;
    }
});

// Start the game loop
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnake();
    checkFoodCollision();
    checkWallCollision();
    checkSelfCollision();
    drawSnake();
    drawFood();
}

// Generate the first food
generateFood();

//add speed slider
var speedSlider = document.getElementById("speed-slider");

var gameLoop = setInterval(loop, speedSlider.value);