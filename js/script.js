console.log("PLEASE FIND THE SOURCE CODE HERE : http://github.com/stephane-ruhlmann/coffee-snake");

window.onload = function() {
  var canvas, cell, checkDirConflict, checkSnakeCollision, context, dir, dirBuf, drawCell, food, gameLoop, h, htmlScore, initSnake, placeFood, render, score, snake, speed, startGame, startGameLoop, stopGameLoop, w;
  canvas = document.querySelector("#game");
  context = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;
  cell = 10;
  dir = dirBuf = "right";
  score = 0;
  snake = {};
  food = {};
  gameLoop = null;
  speed = 80;
  htmlScore = document.getElementById("score");
  initSnake = function() {
    var i, j, results;
    snake.array = [];
    results = [];
    for (i = j = 5; j >= 0; i = --j) {
      results.push(snake.array.push({
        x: i,
        y: 0
      }));
    }
    return results;
  };
  placeFood = function() {
    food.x = Math.floor(Math.random() * (w - cell) / cell);
    return food.y = Math.floor(Math.random() * (h - cell) / cell);
  };
  checkSnakeCollision = function(headX, headY) {
    var j, len, ref, snakeCell;
    ref = snake.array;
    for (j = 0, len = ref.length; j < len; j++) {
      snakeCell = ref[j];
      if (headX === snakeCell.x && headY === snakeCell.y) {
        return true;
      }
    }
    return false;
  };
  drawCell = function(x, y) {
    context.fillStyle = "green";
    return context.fillRect(x * cell, y * cell, cell, cell);
  };
  render = function() {
    var j, len, newX, newY, ref, snakePart, tail;
    context.fillStyle = "white";
    context.fillRect(0, 0, w, h);
    context.strokeStyle = "black";
    context.strokeRect(0, 0, w, h);
    newX = snake.array[0].x;
    newY = snake.array[0].y;
    checkDirConflict();
    switch (dir) {
      case "right":
        newX++;
        break;
      case "left":
        newX--;
        break;
      case "down":
        newY++;
        break;
      case "up":
        newY--;
    }
    if ((newX === (-1) || newX === (w / cell)) || (newY === (-1) || newY === (h / cell)) || checkSnakeCollision(newX, newY)) {
      stopGameLoop();
      startGame();
      return;
    }
    if (newX === food.x && newY === food.y) {
      score++;
      htmlScore.innerHTML = score;
      placeFood();
      tail = {
        x: newX,
        y: newY
      };
    } else {
      tail = snake.array.pop();
      tail.x = newX;
      tail.y = newY;
    }
    snake.array.unshift(tail);
    ref = snake.array;
    for (j = 0, len = ref.length; j < len; j++) {
      snakePart = ref[j];
      drawCell(snakePart.x, snakePart.y);
    }
    return drawCell(food.x, food.y);
  };
  document.addEventListener("keydown", function(e) {
    var key;
    key = e.which;
    if (key === 37 || key === 38 || key === 39 || key === 40) {
      e.preventDefault();
    }
    if (key === 37) {
      return dirBuf = "left";
    } else if (key === 38) {
      return dirBuf = "up";
    } else if (key === 39) {
      return dirBuf = "right";
    } else if (key === 40) {
      return dirBuf = "down";
    }
  });
  checkDirConflict = function() {
    if (dirBuf === "left" && dir !== "right") {
      return dir = dirBuf;
    } else if (dirBuf === "up" && dir !== "down") {
      return dir = dirBuf;
    } else if (dirBuf === "right" && dir !== "left") {
      return dir = dirBuf;
    } else if (dirBuf === "down" && dir !== "up") {
      return dir = dirBuf;
    }
  };
  startGameLoop = function() {
    return gameLoop = setInterval(render, speed);
  };
  stopGameLoop = function() {
    return clearInterval(gameLoop);
  };
  startGame = function() {
    dir = "right";
    dirBuf = "right";
    score = 0;
    htmlScore.innerHTML = score;
    context.fillStyle = "white";
    context.fillRect(0, 0, w, h);
    context.strokeStyle = "black";
    context.strokeRect(0, 0, w, h);
    initSnake();
    placeFood();
    return startGameLoop();
  };
  return startGame();
};
