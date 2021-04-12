var PLAY=1;
var END=0;
var gameState=1;
var ninja, ninja_running, ninja_Collided;
var background1, backgroundImg;
var invisibleGround;
var coins, coinsImg, coinsGroup;
var obstacle, obstacleImg, obstaclesGroup;
var score, survivalTime;
var restart, restartImg;
var track;
var database;

localStorage.HighestScore = 0;
function preload(){
  ninja_running=loadAnimation("ninja1.png" ,"ninja2.png", "ninja3.png", "ninja4.png", "ninja5.png", "ninja6.png", "ninja7.png", "ninja8.png", "ninja9.png", "ninja10.png", "ninja11.png", "ninja12.png", "ninja13.png", "ninja14.png", "ninja15.png", "ninja16.png", "ninja17.png");
  backgroundImg=loadImage("Infinite.jpg");
  coinsImg=loadImage("—Pngtree—cartoon coin_161124.png");
  obstacleImg=loadImage("fire.png");
  restartImg = loadImage("restart.png");
  track = loadImage("images/track.jpg")
}

function setup() {
   createCanvas(displayWidth, displayHeight);
   gameState=PLAY;

  ninja=createSprite(200, 100, 20, 20);
   
  ninja.addAnimation("running", ninja_running);
  ninja.scale=0.1;
  background1=createSprite(250, 200, 600, 400);
  background1.addImage(track);
  background1.scale=1.7;
  restart = createSprite(300,270, 20, 20);
  restart.addImage(restartImg);
  restart.visible = false;
  invisibleGround=createSprite(300,350, 600, 20);
  invisibleGround.visible=false;
  
  ninja.depth=background1.depth;
  ninja.depth=ninja.depth+1;
  score=0;
  survivalTime=0;
  coinsGroup= new Group();
    obstaclesGroup= new Group();
  }

function draw() {
    background("white");
 ninja.setCollider("rectangle", 0, 0, 700, 900);
  ninja.velocityY=ninja.velocityY+0.5;
  ninja.collide(invisibleGround);
  if(gameState===PLAY){                   
  // background1.velocityX=-1;
  // if(background1.x<106){
  //   background1.x=450;
  // }
    gameCurrency();
    fire();
   if(coinsGroup.isTouching(ninja)){
     coinsGroup.destroyEach();
      score=score+2;
    }
  
      
    if(keyDown("up_arrow")){
      ninja.velocityY=-12;
    }
  
  
  
    if(obstaclesGroup.isTouching(ninja)){
      obstaclesGroup.destroyEach();
      gameState=END;
    }
    camera.position.x = displayWidth/4
    camera.position.y = ninja.y
    
 drawSprites();
       
   
    survivalTime=survivalTime+(Math.round(getFrameRate()/60));
   stroke("white");
    fill("black");
    textSize(20);
    text("S c o r e : "+score, 500, 50);
     stroke("white");
   stroke("white");                                 
    fill("black");
    textSize(20);
    text("S u r v i v a l  T i m e :"+survivalTime,10,50);
  }
   

  if(gameState===END){
        restart.visible=true;
   if(mousePressedOver(restart)){
      reset();
    }
   ninja.velocityX=0;
    
    coinsGroup.setVelocityEach=0;
    obstaclesGroup.setVelocityEach=0;
    background1.velocityX=0;
    drawSprites();
    if(localStorage.HighestScore<score){
    localStorage.HighestScore = score;
  }
  console.log(localStorage.HighestScore);
    stroke("white");
    fill("black");
    textSize(20);
    text("S c o r e : "+score, 500, 50);
     stroke("white");
   stroke("white");                                 
    fill("black");
    textSize(20);
    text("S u r v i v a l  T i m e :"+survivalTime,10,50);
    text("Highest Score:"+localStorage.HighestScore, 500, 100);
    stroke("yellow");
    fill("red");
    textSize(50);
    text("GAME OVER!", 140, 200);
    stroke("black");
    fill("black");
    textSize(20);
    text("Better Luck next time!", 200, 230);
  }
  }
  
function gameCurrency(){
 if(frameCount%60===0){
   
 
   coins=createSprite(900, 270, 20, 20);
  coins.y=Math.round(random(140, 280));
    coins.addImage(coinsImg);
    coins.velocityX=-(10+3*survivalTime/100);
    coins.scale=0.05;
    coins.lifeTime=900;
  coinsGroup.add(coins);
  
  }
    
 
}
function fire(){
  if(frameCount%120===0){
  obstacle=createSprite(900, 310, 20, 20);
  obstacle.addImage(obstacleImg);
  obstacle.velocityX=-(5+3*survivalTime/100);
  obstacle.lifeTime=900;
  obstacle.scale=0.13;
  obstaclesGroup.add(obstacle);
  }
}
 function reset() {
  gameState = PLAY;
  restart.visible = false;
  background1.vsible=true;
    ninja.vsible=true;
    coinsGroup.vsible=true;
    obstaclesGroup.vsible=true;
  obstaclesGroup.destroyEach();
  
  survivalTime=0;
  score = 0;
   
 }
  
