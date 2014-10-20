/*-----------------------------------------------------------------------------
 * Variiables
 *-----------------------------------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;
var snakeDiretion;

var food;

var context;
var ScreenWidth;
var ScreenHeight;
/*-----------------------------------------------------------------------------
 * Executing Game Functions
 * ----------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
snakeUpdate();
setInterval(gameLoop, 1000/10);
/*-----------------------------------------------------------------------------
 * Game Functions
 * ----------------------------------------------------------------------------
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    document.addEventListener("keydown", snakeMovement);
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "blue";
    context.fillRect(0, 0, screenWidth, screenHeight);
}
/*-----------------------------------------------------------------------------
 * Snake Function
 * ----------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 3;
    snakeSize = 30;
    snakeDirection = "down";
    
    for(var index = snakeLength -1; index >=0; index--){
        snake.push({
            x: index,
            y:0
        });
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++){
        context.fillStyle = "lime";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if(snakeDirection == "down") {
        //down arrow key
        snakeHeadY++;
    }
    else if(snakeDirection == "left") {
        //left arrow key
        snakeHeadX--;
    }
    else if(snakeDirection == "up") {
        //up arrow key
        snakeHeadY--;
    }
    else if(snakeDirection == "right") {
        //right arrow key
        snakeHeadX++;
    }
    
    var snakeTail = snake.pop();    
    snakeTail.y = snakeHeadY;
    snakeTail.x = snakeHeadX;
    snake.unshift(snakeTail);
}

function snakeMovement(event) {
    if (event.keyCode == "40" && snakeDirection != "up") {
        // down arrow
        snakeDirection = "down";
    }
    else if (event.keyCode == '38' && snakeDirection != "down") {
        // up arrow
        snakeDirection = "up";
    }
    else if (event.keyCode == '39' && snakeDirection != "left") {
        // right arrow
        snakeDirection = "right";
    }
    else if (event.keyCode == '37' && snakeDirection != "right") {
        // left arrow
        snakeDirection = "left";
    }
}
/*-----------------------------------------------------------------------------
 * Food Functions
 * ----------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "gray";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

function keyboardHandeler(event){
    console.log(event);
}