

///board////

var blockSize = 25
var rows = 20;
var cols = 24;

var board;
var context;
var score = 0;


///Dragon///


var dragonX = blockSize * 5;
var dragonY = blockSize * 5;

var velocityX    = 0;
var velocityY = 0;


var dragonBody = [];

//Fire balls//

var fireX;
var fireY;


var gameOver = false;
window.onload = function(){

    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    fireGenerator();
    document.addEventListener("keydown",changeDirection);

   // update();

   setInterval(update, 1000/10);

}


function changeDirection(e){
    if( e.code == "ArrowUp" && velocityY !=1){

        velocityX = 0;
        velocityY = -1;
    
    }
    else if( e.code == "ArrowDown"  && velocityY !=-1){
    
        velocityX = 0;
        velocityY = 1;
    
    }
    
    else if( e.code == "ArrowLeft"  && velocityX !=1){
    
        velocityX = -1;
        velocityY = 0;
    
    }
    
    else if( e.code == "ArrowRight"  && velocityX !=-1) {
    
        velocityX = 1;
        velocityY = 0;
    
    }
}

function update() {
    if (gameOver) {
      return;
    }
  
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
  
    context.fillStyle = "red";
    context.fillRect(fireX, fireY, blockSize, blockSize);
  
    if (dragonX == fireX && dragonY == fireY) {
      dragonBody.push([fireX, fireY]);
      
      
     

      fireGenerator();
   
         
      var a = document.getElementById("score");

      score ++;

      a.innerHTML = "score" + " " + score;


    }
  
    context.fillStyle = "purple";
    dragonX += velocityX * blockSize;
    dragonY += velocityY * blockSize;
  
    for (let i = 0; i < dragonBody.length; i++) {
      if (dragonX == dragonBody[i][0] && dragonY == dragonBody[i][1]) {
        gameOver = true;
        alert("Game over");
        return;
      }
    }
  
    context.fillRect(dragonX, dragonY, blockSize, blockSize);
    for (let i = 0; i < dragonBody.length; i++) {
      context.fillRect(dragonBody[i][0], dragonBody[i][1], blockSize, blockSize);
    }
  
    for (let i = dragonBody.length - 1; i > 0; i--) {
      dragonBody[i] = dragonBody[i - 1];
    }
  
    if (dragonBody.length) {
      dragonBody[0] = [dragonX, dragonY];
    }
  
    if (dragonX < 0 || dragonX > cols * blockSize || dragonY < 0 ||   dragonY > rows * blockSize) {
      gameOver = true;
      alert("Game over");
    }
  }
  

 function fireGenerator(){



    fireX = Math.floor(Math.random()* cols) * blockSize;
    fireY = Math.floor(Math.random()* rows) * blockSize;

}

function restart(){

    location.reload();


}

var second = 0;
var timerStart = false;

function timer() {
  document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      if (!timerStart) {
        timerStart = true;
        setInterval(function() {
          Timer.innerHTML = second++;
        }, 1000);
      }
    }
  });
}

timer();


