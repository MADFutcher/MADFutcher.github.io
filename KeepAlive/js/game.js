let ghostsArray = [];
let foodArray = [];
let foodQuantity = 12;
let ghostQuantity = 5;
let healthDropInterval;
let player;
let box;
let width;
let height;
let requestId;

document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    player.x = player.x + 5;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    player.x = player.x - 5;
  } else if (e.key == 'Up' || e.key == 'ArrowUp') {
    player.y = player.y - 5;
  } else if (e.key == 'Down' || e.key == 'ArrowDown') {
    player.y = player.y + 5;
  }
  e.preventDefault();
}

window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
  let box = document.querySelector('#canvasCol');
  width = box.offsetWidth;
  height = box.offsetWidth;

  if (height >= 1110) {
    height = 570;
  }
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function updateHealth(){
  if(player.health>50){
    healthBar.classList.add('bg-success')
    healthBar.classList.remove('bg-warning')
    healthBar.classList.remove('bg-danger')
  } else if(player.health <=50 && player.health>25){
    healthBar.classList.remove('bg-success')
    healthBar.classList.add('bg-warning')
  }else if(player.health <=25){
    healthBar.classList.remove('bg-success')
    healthBar.classList.remove('bg-warning')
    healthBar.classList.add('bg-danger')
  }
  healthBar.style.width = `${player.health}%`
}

function updateProgress(){
  percentage = 100-(foodArray.length / foodQuantity)*100
  console.log(percentage)
  progressBar.style.width = `${percentage}%`
}

function healthDrop(){
  healthDropInterval = setInterval(function(){
      if(player.health<=0){
        clearInterval(healthDropInterval)
      }
      player.health -= 1
      // console.log(player.health)
      updateHealth()
    } 
    ,5000)
}

function getPathCoords(xpos, ypos) {
  let startPos = { x: xpos, y: ypos };
  let routeArray = [];
  // let i = randomNumber(6, 50);
  let i = 3;
  let route = [];
  while (i--) {
    let angle = randomNumber(0, 360);
    // each line shouldn't be too long
    let length = randomNumber(0, width / 5);
    let endPos = getLineEndPoint(startPos, length, angle);
    let bezier1Angle = randomNumber(angle - 90, angle + 90) % 360;
    let bezier2Angle = (180 + randomNumber(angle - 90, angle + 90)) % 360;
    let bezier1Length = randomNumber(0, length / 2);
    let bezier2Length = randomNumber(0, length / 2);
    let bezier1Pos = getLineEndPoint(startPos, bezier1Length, bezier1Angle);
    let bezier2Pos = getLineEndPoint(endPos, bezier2Length, bezier2Angle);
    if (endPos.x > width) {
      endPos.x = width - 100;
    }
    if (endPos.y > height) {
      endPos.y = height - 100;
    }
    if (endPos.x < 0) {
      endPos.x = width + 100;
    }
    if (endPos.y < 0) {
      endPos.y = height + 100;
    }
    route.push(
      plotCBez(
        1000,
        1.5,
        startPos.x,
        startPos.y,
        bezier1Pos.x,
        bezier1Pos.y,
        bezier2Pos.x,
        bezier2Pos.y,
        endPos.x,
        endPos.y
      )
    );
    startPos = endPos;
  }
  for (i = 0; i < route.length; i++) {
    routeArray = routeArray.concat(route[i]);
  }

  return routeArray;
}

function collisionDetection() {
    let hitArr = [];
  ghostsArray.forEach((ghost) => {
    // console.log(ghost.name)
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val))
    }
    
    // Find the closest point to the circle within the rectangle
    // Assumes axis alignment! ie rect must not be rotated
    var closestX = clamp(player.x, ghost.x, ghost.x + ghost.width);
    var closestY = clamp(player.y, ghost.y, ghost.y + ghost.height);

    // Calculate the distance between the circle's center and this closest point
    var distanceX = player.x - closestX;
    var distanceY = player.y - closestY;

    // If the distance is less than the circle's radius, an intersection occurs
    var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

    if(distanceSquared < (player.radius * player.radius)){
        hitArr.push(true)
    }
  });
  return hitArr
}

function eatenFood(){
    let eatenArr = [];
    if(foodArray.length===0){
        return true;
    }
    foodArray.forEach(function(food, index, object){
        // console.log(food)
        var circle1 = player;
        var circle2 = food;
    
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < circle1.radius + circle2.radius) {
            // console.log('hit')
            eatenArr.push(true)
            object.splice(index,1)
            if(player.health <100){
                // console.log('You Eat some Food! Good Job!')
                player.health ++
                updateHealth()
                // console.log(`health is at: ${player.health}`)
            }
            updateProgress()
        }
    })
}

function initialiseFood() {
  foodArray=[];
  for (let i = 0; i < foodQuantity; i++) {
    let randomX = randomNumber(width, 10);
    let randomY = randomNumber(height, 10);
    let radius = 5
    let food = new Food(randomX, randomY, radius);
    foodArray.push(food);
  }
}

function initialiseGhost() {
  ghostsArray = [];
  for (let i = 0; i < ghostQuantity; i++) {
    let randomX = randomNumber(width, 100);
    let randomY = randomNumber(height, 100);
    // let speed = 0.2 + Math.random() * 3;
    let path = getPathCoords(randomX, randomY);
    let name = `Ghost_${i}`;
    let colour = '';
    switch (i) {
      case 0:
        colour = 'yellow';
        break;
      case 1:
        colour = 'blue';
        break;
      case 2:
        colour = 'red';
    }
    let ghost = new Ghost(randomX, randomY, path, name, colour, 10);
    ghostsArray.push(ghost);
  }
}

function initialisePlayer() {
  let randomX = randomNumber(width, 100);
  let randomY = randomNumber(height, 100);
  let radius = 10
  let health = 100
  player = new Player(randomX, randomY,radius,health);
}

function gameOver(message) {
    if(message.includes('|')){
      messages = message.split('|')
      document.getElementById('message').innerHTML = `<h1>${messages[0]}</h1><p>${messages[1]}`
    }else{
      document.getElementById('message').innerHTML = `<h1>${message}</h1>`
    }
   
    $('#myModal').modal()
    console.log(requestId)
    console.log(cancelAnimationFrame(requestId))
    cancelAnimationFrame(requestId)
    stopInterval(healthDropInterval)

}

function draw() {
  clearCanvas();
  if(player.health<=0){
    gameOver('GAME OVER | Your Health ran out!');
    return;
  }
  ghostsArray.forEach((el) => {
    el.createGhost();
  });
  foodArray.forEach((el) => {
    el.createFood();
  });
  player.createPlayer();
  if(eatenFood()){
    gameOver("You've Won!!");
    return;
  };
  let collision = collisionDetection()
  if(collision.length>0){
      player.health = player.health - (collision.length / 10)
      updateHealth()
      // console.log(`player health: ${player.health}`)
      if(player.health<0){
        gameOver('GAME OVER | You were killed by a Ghost');
        return;
      }

  }
  requestId = requestAnimationFrame(draw);
}

initialiseGhost();
initialiseFood();
initialisePlayer();
