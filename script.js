var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10;
var w = 350;
var h = 350;
var score = 0;
var snake;

var food;

var drawModule = (function () {

    var bodySnake = function (x, y) {
        //this is the singel square
        ctx.fillStyle = 'green';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        // this is the border of the square
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var pizza = function (x, y) {
        // this is the border of the pizza
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        // this is the singel square
        ctx.fillStyle = 'red';
        ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    var scoreText = function () {
        //how many pizzas did the snake eat
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h - 5);
    }

    var drawSnake = function () {
        //the initall snake will have 5 square
        var length = 5;
        snake = [];
        // Using a for loop we push the 5 elements inside the array(squares).
        // Every element will have x = 0 and the y will take the value of the index.
        for (var i = length - 1; i >= 0; i--) {
            snake.push({ x: i, y: 0 });
        }
    }

    var paint = function () {
        //draw the area were the snake will move
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, w, h);
        //give it a border
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);
        //disable the start button while you're playing
        btn.setAttribute('disabled', true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;
        /*
   Make the snake move.
   Use a variable ('direction') to control the movement.
   To move the snake, pop out the last element of the array and shift it on the top as first element.
   */

        if (direction == 'right') {
            snakeX++;
        }
        else if (direction == 'left') {
            snakeX--;
        }
        else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }
        /*
        If the snake touches the canvas path or itself, it will die!
        Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
        If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again. 
        */
        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
            //restart game
            btn.removeAttribute('disabled', true);
            // clean the canvas
            ctx.clearRect(0, 0, w, h);
            //display score
            alert("your score was: "+score);
            //reset score to 0
            score = 0;
            gameloop = clearInterval(gameloop);
            return;
        }
        //If the snake eats food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array.
        if (snakeX == food.x && snakeY == food.y) {
            var tail = { x: snakeX, y: snakeY }; //Create a new head instead of moving the tail
            score++;

            createFood(); //Create new food
        } else {
            var tail = snake.pop(); //pops out the last cell
            tail.x = snakeX;
            tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        //For each element of the array create a square using the bodySnake function we created before.
        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }
        //create food using pizza function
        pizza(food.x, food.y);
        //put the score text
        scoreText();
    }

    var createFood = function () {
        food = {
            // generate random coordinates
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }
        // find position of snakes body
        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }
    //check collision is to see if the snake has crashed on it's self
    var checkCollision = function (x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
                
        }
        return false;
        
    }
   
    var init = function () {
        direction = 'down';
        drawSnake();
        createFood();
        gameloop = setInterval(paint, 80);
    }

    //run init at end of module
    return {
        init: init
    };

    // close module
}());



(function (window, document, drawModule, undefined) {

    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () { drawModule.init(); });

    document.onkeydown = function (event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch (keyCode) {

            case 37:
                if (direction != 'right') {
                    direction = 'left';
                }
                console.log('left');
                break;

            case 39:
                if (direction != 'left') {
                    direction = 'right';
                    console.log('right');
                }
                break;

            case 38:
                if (direction != 'down') {
                    direction = 'up';
                    console.log('up');
                }
                break;

            case 40:
                if (direction != 'up') {
                    direction = 'down';
                    console.log('down');
                }
                break;
        }
    }


})(window, document, drawModule);
