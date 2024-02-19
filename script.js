//Add a sound track

var runSound = new Audio("run.mp3");
runSound.loop=true;
var backgroundSound = new Audio("backSound.mp3");
backgroundSound.loop=true;
var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");

function keyCheck(event) {
  //enter
  if (event.which == 13) {
    if (runWorkerId == 0) {
      clearInterval(idleWorkerId);
      runWorkerId = setInterval(run, 100);
      backgroundSound.play();
      runSound.play();
      backgroundWorkerId = setInterval(moveBackground, 100);
      createBlockWorkerId = setInterval(createBlock, 100);
      moveBlockWorkerId = setInterval(moveBlock, 100);
      scoreWorkerId = setInterval(updateScore, 100);
    }
  }
  //space
  if (event.which == 32) {
    if (jumpWorkerId == 0) {
      
      clearInterval(runWorkerId);
      runWorkerId=-1;
      runSound.pause();
      jumpWorkerId = setInterval(jump, 100);
      jumpSound.play();
      backgroundSound.play();
  }
  }
}

//run
var player = document.getElementById("player");

var runWorkerId = 0;
var runImageNumber = 1;
function run() {
  runImageNumber++;

  if (runImageNumber == 9) {
    runImageNumber = 1;
  }

  player.src = "Run (" + runImageNumber + ").png";
}

//Jump

var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 230;

function jump() {
  jumpImageNumber++;

  //fly
  if (jumpImageNumber <= 7) {
    playerMarginTop = playerMarginTop - 30;
    player.style.marginTop = playerMarginTop + "px";
  }

  if (jumpImageNumber >= 8) {
    playerMarginTop = playerMarginTop + 30;
    player.style.marginTop = playerMarginTop + "px";
  }
  //Land
  if (jumpImageNumber == 13) {
    jumpImageNumber = 1;

    clearInterval(jumpWorkerId);
    runWorkerId = setInterval(run, 100);
    jumpWorkerId = 0;
    runSound.play();

    //Starting a jump
      if(scoreWorkerId==0){
        scoreWorkerId=setInterval(updateScore,100);
      }
      if(backgroundWorkerId==0){
        backgroundWorkerId=setInterval(moveBackground,100);
      }
      if(createBlockWorkerId==0){
        createBlockWorkerId=setInterval(createBlock,100);
      }
      if(moveBlockWorkerId==0){
        moveBlockWorkerId=setInterval(moveBlock,100);
      }



  }
  player.src = "Jump (" + jumpImageNumber + ").png";
}

//background

var background = document.getElementById("background");

//move background

var backgroundWorkerId = 0;
var positionX = 0;

function moveBackground() {
  positionX = positionX - 20;

  background.style.backgroundPositionX = positionX + "px";
}

//idle
var idleImageNumber = 1;
var idleWorkerId = 0;

function idle() {
  idleImageNumber++;
  if (idleImageNumber == 11) {
    idleImageNumber = 1;
  }
  player.src = "Idle (" + idleImageNumber + ").png";
}
//idle Start

function idleStart() {
  idleWorkerId = setInterval(idle, 200);
}

//Create Block
var createBlockWorkerId = 0;
var blockMarginLeft = 200;
var blockNumber = 1;

function createBlock() {
  var block = document.createElement("div");
  block.className = "block";
  block.id = "block" + blockNumber;

  blockNumber++;

  var gap = Math.random() * (1000 - 400) + 400;

  blockMarginLeft = blockMarginLeft + gap;
  block.style.marginLeft = blockMarginLeft + "px";

  document.getElementById("background").appendChild(block);
}

//Move Block
var moveBlockWorkerId = 0;

function moveBlock() {
  for (var i = 1; i <= blockNumber; i++) {
    var currentBlock = document.getElementById("block" + i); //Catch the block
    var currentBlockMarginLeft = currentBlock.style.marginLeft;
    var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

    currentBlock.style.marginLeft = newBlockMarginLeft + "px";

   //alert(newBlockMarginLeft);
   //136 - 16
   
   if(newBlockMarginLeft<140 & newBlockMarginLeft>16){

    //alert(playerMarginTop);
    //200
    //alert("dead");

    if(playerMarginTop>200){

      clearInterval(runWorkerId);
      clearInterval(jumpWorkerId);
      jumpWorkerId = -1;
      runSound.pause();
      backgroundSound.pause();
      deadSound.play();
      clearInterval(backgroundWorkerId);
      clearInterval(scoreWorkerId);
      clearInterval(createBlockWorkerId);
      clearInterval(moveBlockWorkerId);
      clearInterval(idleWorkerId);

      deadWorkerId=setInterval(dead,100);
      //alert("Dead")
    }
   }
  }
}

//Dead
var deadWorkerId=0;
var deadImageNumber = 1;

function dead(){
  deadImageNumber++;

  if (deadImageNumber==11){
   deadImageNumber=10;

   player.style.marginTop="230px";

   document.getElementById("endScore").innerHTML = newScore;
   document.getElementById("endScreen").style.visibility="visible";
  }

  player.src ="Dead ("+deadImageNumber+").png";
}




//score

var score = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore() {
  newScore++;
  score.innerHTML = newScore;
}

//Page Reload

function reload(){
  location.reload();
}