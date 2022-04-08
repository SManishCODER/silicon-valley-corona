var path,coin,policecar,policecar2,policecar3,maincar,energydrink, missile,title,play,playImg,bg,bgImg;
var pathImg,coinImg,policecarImg,policecar2Img,policecar3Img,maincarImg,energydrinkImg,missileImg,titleImg;
var HISCORE=300;
var Score=0;
var policecarG,policecar2G,policecar3G,energydrinkG,coinG,missileG;
var gameoverImg,gameover;
var restart,restartImg,fuel,sound;
var reset,wrong,wrongImg,correct,correctImg;
var attack,attackImg;
var injectionquizImg,injectionoption1Img,injectionoption2Img,injectionoption3Img,injectionoption4Img;
var injectionquiz,injectionoption1,injectionoption2,injectionoption3,injectionoption4,laugh;
var title,titleImg;
//Game States
var form,game;
var WAIT=1;
var PLAY=2;
var END=3;

var gameState=WAIT;
var WIN=0;


function preload(){
  pathImg = loadImage("Road.png");
  policecarImg = loadImage("corona.png");
  maincarImg = loadAnimation("Runner-1.png","Runner-2.png");
  policecar2Img = loadImage("corona2.png");
  policecar3Img = loadImage("corona3.png");
  coinImg = loadImage("injection.png");
  energydrinkImg = loadImage("handwash.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("reset.png");
  titleImg=loadImage("title.png");
  missileImg=loadImage("mask.png");
  laugh=loadSound("pirate_laugh.mp3");
  playImg=loadImage("play.png");
  bgImg=loadImage("bg2.png");
  tin = loadSound("collided.wav");
  sound=loadSound("background_music.mp3")
 
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
  

path=createSprite(width/2,200);
path.addImage(pathImg);

restart=createSprite(350,150);
restart.addImage(restartImg);
restart.scale=0.3;
restart.visible=false;


bg=createSprite(700,350,90,90);
bg.addImage(bgImg);
bg.scale=1.2;
bg.visible=false;


maincar = createSprite(width/2,height-20,20,20);
maincar.addAnimation("maincarRunning",maincarImg);
maincar.scale=0.09;
maincar.visible=false;


gameover = createSprite(700,150);
gameover.addImage(gameoverImg);
gameover.scale = 0.8;
gameover.visible = false;  


play = createSprite(650,150);
play.addImage(playImg);
play.scale = 0.8;
play.visible=false;

 
title = createSprite(550,350);
title.addImage(titleImg);
title.scale = 0.8;
title.visible=false;



policecarG= new Group();
policecar2G= new Group()
policecar3G= new Group();
coinG = new Group();
energydrinkG = new Group();
missileG = new Group();
fuels = new Group();
}



function draw() {
  
drawSprites();



if(gameState===1){

  path.velocityY=0;
  play.visible=true;
  bg.visible=true;
  maincar.addAnimation("maincarRunning",maincarImg);

  if(mousePressedOver(play)) {
    gameState=2;
  }
}

  
 else if(gameState===2){
    
  
  textSize(20);
  fill("orange");
  text("HI SCORE:"+ HISCORE,width-250,90);


  textSize(20);
  fill("yellow");
  
  text("Score:" + Score,width-250,50);


 
  maincar.x = World.mouseX;
  maincar.visible=true;
  play.visible=false;
  bg.visible=false;
  title.visible=false;

  
  edges= createEdgeSprites();
  maincar.collide(edges);
 
  
  path.velocityY = +(4 + 3* Score/40)
  maincar.velocityY = maincar.velocityY + 10
  
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
    sound.play();
  }
  
  createMissile();
  createCoin();
    createPolicecar2();
    createPolicecar3();
    createEnergydrink();
    createPolicecar();
  
   
 
    if(coinG.isTouching(maincar)) {
      coinG.destroyEach();
      tin.play();
      Score= Score +20;
    }
    

     if(energydrinkG.isTouching(maincar)){
      energydrinkG.destroyEach();
      Score = Score +10;  
      tin.play();
    }


    if(missileG.isTouching(maincar)){
      tin.play();
      missileG.destroyEach();
      Score = Score +15;
  }

    
    if(policecar2G.isTouching(maincar)) {
      gameState=END;
      policecar2G.velocityY=0;
      laugh.play();

     }

     if(policecar3G.isTouching(maincar)) {
      gameState=END;
      policecar3G.velocityY=0
      laugh.play();

     }

     if(policecarG.isTouching(maincar)) {
      gameState=END;
      policecarG.velocityY=0;
      laugh.play();
     } 
 }
    
     else if(gameState===END){
       gameover.visible=true;
       restart.visible=true;
       title.visible=true;

      
       maincar.addAnimation("maincarRunning",maincarImg);
      
      policecar2G.destroyEach();
      policecarG.destroyEach();
      policecar3G.destroyEach();
      coinG.destroyEach();
      energydrinkG.destroyEach();
      missileG.destroyEach();

      policecarG.setVelocityYEach(0);
      policecar2G.setVelocityYEach(0);
   policecar3G.setVelocityYEach(0);
   coinG.setVelocityYEach(0);
   energydrinkG.setVelocityYEach(0);
   missileG.setVelocityYEach(0);

   path.velocityY= 0;
    maincar.velocityY = 0;

    
    if(mousePressedOver(restart)) {
      reset();
  }
}


    
    
    if(Score >=400){
      maincar.visible =true;
      textSize(30);
      stroke("black");
      fill("skyblue");
      text("Congragulations!! You win the game!! ", 300,100);
      gameState = WIN;
      gameover.visible = true;
    restart.visible =true;
      maincar.visible=false;


      
    policecar2G.destroyEach();
      policecarG.destroyEach();
      policecar3G.destroyEach();
      coinG.destroyEach();
      energydrinkG.destroyEach();
      missileG.destroyEach();
                              

      policecarG.setVelocityYEach(0);
      policecar2G.setVelocityYEach(0);
   policecar3G.setVelocityYEach(0);
   coinG.setVelocityYEach(0);
   energydrinkG.setVelocityYEach(0);
   missileG.setVelocityYEach(0);


   path.velocityY= 0;
    maincar.velocityY = 0;


    if(mousePressedOver(restart)) {
      reset();
  } 
  } 
  }   
   
  
    
   

  function createCoin() {
    if (World.frameCount % 500 == 0) {
     // Modify the positions of cash 
      var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
      coin.addImage(coinImg)
      coin.addImage(coinImg);
    coin.scale=0.21;
    coin.velocityY= +(5 + Score/30);
    coin.lifetime = 200;
    coinG.add(coin);
    }
  }


  function createPolicecar() {
    if (World.frameCount % 150 == 0) {
     // Modify the positions of cash 
      var policecar = createSprite(Math.round(random(50, width-30),40, 10, 10));
      policecar.addImage(policecarImg);
      policecar.scale=0.45;
      policecar.velocityY= +(6 + Score/30);
      policecar.lifetime = 200;
      policecarG.add(policecar);
    }
  }

 
  function createPolicecar2() {
    if (World.frameCount % 120 == 0) {
     // Modify the positions of cash 
      var policecar2 = createSprite(Math.round(random(50, width-50),40, 10, 10));
      policecar2.addImage(policecar2Img);
      policecar2.scale=0.49;
      policecar2.velocityY= +(6 + Score/30);
      policecar2.lifetime = 200;
      policecar2G.add(policecar2);
    }
  }


  function createMissile() {
    if (World.frameCount % 120 == 0) {
     // Modify the positions of cash 
      var missile = createSprite(Math.round(random(80, width-30),40, 10, 10));
      missile.addImage(missileImg);
      missile.scale=0.15;
      missile.velocityY= +(7 + Score/30);
      missile.lifetime = 200;
      missileG.add(missile);
     
    }
  }
  

  function createPolicecar3() {
    if (World.frameCount % 200 == 0) {
     // Modify the positions of cash 
      var policecar3 = createSprite(Math.round(random(30, width-70),40, 10, 10));
      policecar3.addImage(policecar3Img);
      policecar3.scale=0.31;
      policecar3.velocityY= +(4+ Score/30);
      policecar3.lifetime = 200;
      policecar3G.add(policecar3);
    }
  }


  function createEnergydrink() {
    if (World.frameCount % 250 == 0) {
     // Modify the positions of cash 
      var energydrink = createSprite(Math.round(random(50, width-60),40, 10, 10));
      energydrink.addImage(energydrinkImg);
      energydrink.scale=0.28;
      energydrink.velocityY= +(5 + Score/40);
      energydrink.lifetime = 200;
      energydrinkG.add(energydrink);
    }
  }


  function reset(){
    gameState = 2;
    gameover.visible = false;
   maincar.addAnimation("maincarRunning",maincarImg);
    restart.visible=false;
   policecarG.destroyEach();
    policecar2G.destroyEach();
    policecar3G.destroyEach();
    
    Score = 0;
   }
   

  
   
  
    
   
   
  