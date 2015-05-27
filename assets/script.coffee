console.log "PLEASE FIND THE SOURCE CODE HERE : http://github.com/stephane-ruhlmann/coffee-snake"
window.onload = ->
  canvas       = document.querySelector "#game"
  context      = canvas.getContext "2d"
  w            = canvas.width
  h            = canvas.height
  cell         = 10
  dir = dirBuf = "right"
  score        = 0
  snake        = {}
  food         = {}
  gameLoop     = null
  speed        = 80
  htmlScore    = document.getElementById("score")

  initSnake = ->
    snake.array = []
    for i in [5..0]
      snake.array.push {x:i, y:0}

  placeFood = ->
    food.x = Math.floor(Math.random() * (w-cell)/cell)
    food.y = Math.floor(Math.random() * (h-cell)/cell)

  checkSnakeCollision = (headX, headY) ->
    for snakeCell in snake.array when headX is snakeCell.x and headY is snakeCell.y
      return true
    return false

  drawCell = (x, y) ->
    context.fillStyle = "green"
    context.fillRect x*cell, y*cell, cell, cell

  render = ->
    context.fillStyle = "white"
    context.fillRect 0, 0, w, h
    context.strokeStyle = "black"
    context.strokeRect 0, 0, w, h
    newX = snake.array[0].x
    newY = snake.array[0].y

    # several dir changes can happen between two loop cycles
    checkDirConflict()
    switch dir
      when "right" then newX++
      when "left" then newX--
      when "down" then newY++
      when "up" then newY--

    # check for game over
    if newX in [-1, w/cell] or newY in [-1, h/cell] or checkSnakeCollision(newX, newY)
      stopGameLoop()
      startGame()
      return

    # check if food is eaten
    if newX is food.x and newY is food.y
      score++
      htmlScore.innerHTML = score
      placeFood()
      tail = {x:newX, y:newY}
    else
      tail = snake.array.pop()
      tail.x = newX
      tail.y = newY

    # move the snake by putting tail to head
    snake.array.unshift tail
    # draw the snake and food
    for snakePart in snake.array
      drawCell snakePart.x, snakePart.y
    drawCell food.x, food.y

  document.addEventListener "keydown", (e) ->
    key = e.which
    e.preventDefault() if key in [37, 38, 39, 40]
    if key is 37 then dirBuf = "left"
    else if key is 38 then dirBuf = "up"
    else if key is 39 then dirBuf = "right"
    else if key is 40 then dirBuf = "down"

  checkDirConflict = ->
    if dirBuf is "left" and dir isnt "right" then dir = dirBuf
    else if dirBuf is "up" and dir isnt "down" then dir = dirBuf
    else if dirBuf is "right" and dir isnt "left" then dir = dirBuf
    else if dirBuf is "down" and dir isnt "up" then dir = dirBuf

  startGameLoop = ->
    gameLoop = setInterval render, speed

  stopGameLoop = ->
    clearInterval gameLoop

  startGame = ->
    dir = "right"
    dirBuf = "right"
    score = 0
    htmlScore.innerHTML = score
    context.fillStyle = "white"
    context.fillRect 0, 0, w, h
    context.strokeStyle = "black"
    context.strokeRect 0, 0, w, h
    initSnake()
    placeFood()
    startGameLoop()

  startGame()
