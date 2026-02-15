// Pong Game JavaScript Logic

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10;
const paddleHeight = 100;
const playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };
const computerPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };

// Create the pong ball
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 8, speed: 4, direction: 1 };  

// Draw functions
function drawPaddle(paddle) {
    context.fillStyle = 'white';
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fill();
}

// Game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(playerPaddle);
    drawPaddle(computerPaddle);
    drawBall();

    // Update ball position
    ball.x += ball.speed * ball.direction;
    ball.y += ball.speed * ball.direction;

    // Boundary detection
    // ... add collision and scoring here ...

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
