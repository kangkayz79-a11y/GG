// Pong Game

// Constants
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const paddleSpeed = 4;
const ballSpeed = 4;
const AI_SPEED = 3; // Speed of AI

// Game Variables
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVelocityX = ballSpeed;
let ballVelocityY = ballSpeed;
let playerScore = 0;
let aiScore = 0;
let isPaused = false;
let gameState = 'playing'; // other states: 'paused', 'gameOver'

// Event Listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
        playerPaddleY = Math.max(0, playerPaddleY - paddleSpeed);
    } else if (event.key === 'ArrowDown') {
        playerPaddleY = Math.min(canvas.height - paddleHeight, playerPaddleY + paddleSpeed);
    } else if (event.key === ' ') {
        togglePause();
    }
}

function togglePause() {
    isPaused = !isPaused;
    gameState = isPaused ? 'paused' : 'playing';
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, playerPaddleY);
    drawPaddle(canvas.width - paddleWidth, aiPaddleY);
    drawBall(ballX, ballY);
    drawScore();
}

function drawPaddle(x, y) {
    context.fillStyle = '#00f';
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
    context.fillStyle = '#f00';
    context.beginPath();
    context.arc(x, y, ballSize, 0, Math.PI * 2);
    context.fill();
}

function drawScore() {
    context.fillStyle = '#000';
    context.font = '20px Arial';
    context.fillText('Player: ' + playerScore, 10, 20);
    context.fillText('AI: ' + aiScore, canvas.width - 70, 20);
}

function updateAI() {
    if (ballY < aiPaddleY + paddleHeight / 2) {
        aiPaddleY = Math.max(0, aiPaddleY - AI_SPEED);
    } else if (ballY > aiPaddleY + paddleHeight / 2) {
        aiPaddleY = Math.min(canvas.height - paddleHeight, aiPaddleY + AI_SPEED);
    }
}

function updateBall() {
    ballX += ballVelocityX;
    ballY += ballVelocityY;

    // Check Collisions
    if (ballY <= 0 || ballY >= canvas.height) {
        ballVelocityY = -ballVelocityY;
    }
    const playerPaddleX = 0;
    const aiPaddleX = canvas.width - paddleWidth;

    if (ballX <= playerPaddleX + paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
        ballVelocityX = -ballVelocityX;
    }
    if (ballX >= aiPaddleX && ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
        ballVelocityX = -ballVelocityX;
    }

    // Scoring
    if (ballX < 0) {
        aiScore++;
        resetBall();
    } else if (ballX > canvas.width) {
        playerScore++;
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballVelocityX = ballSpeed * (Math.random() < 0.5 ? 1 : -1);
    ballVelocityY = ballSpeed * (Math.random() < 0.5 ? 1 : -1);
}

function gameLoop() {
    if (!isPaused) {
        updateAI();
        updateBall();
        draw();
    }
    requestAnimationFrame(gameLoop);
}

// Start Game
requestAnimationFrame(gameLoop);