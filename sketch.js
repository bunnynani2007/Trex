

var trex, trex_running, edges, ground, dander5, invisibleground, trexcollided;
var groundImage;
var cloud, movingcloud;
var cactus, c1, c2, c3, c4, c5, c6;
var gamestate="play";
var c1group, c2group;
var score=0;
var gameover, gameimg, restart, restartimg;
var checkpoint, jump, die;
function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
movingcloud=loadImage("cloud.png");
ground1 = loadImage("ground2.png");
  gameimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png");
c1=loadImage("obstacle1.png");
c2=loadImage("obstacle2.png");
  c3=loadImage("obstacle3.png");
  c4=loadImage("obstacle4.png");
  c5=loadImage("obstacle5.png");
  c6=loadImage("obstacle6.png");
  trexcollided=loadAnimation("trex_collided.png");
  checkpoint=loadSound("checkPoint.mp3");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
}

function setup(){
  
  createCanvas(600,200);
  gameover=createSprite(300,90,20,20);
  gameover.addImage(gameimg);
  gameover.scale=0.5;
  
  restart=createSprite(300,120,20,20);
  restart.addImage(restartimg);
  restart.scale=0.5;
  
  gameover.visible=false;
  restart.visible=false;
  
  trex = createSprite(50,160,20,50);
  trex.scale = 0.5
  trex.addAnimation("running",trex_running);
  trex.addAnimation("trexcollided1", trexcollided);

  ground = createSprite(200,180,150,20);
  ground.addImage("floor", ground1);
 
  ground.x=ground.width/2;
  
  invisibleground=createSprite(200,190,400,10);
  invisibleground.visible=false;
  // creating trex
 c1group=new Group()
c2group=new Group()
 // trex.debug=true;
  trex.setCollider("circle", 0,0,40);
  
}

function draw(){
  //set background color 
  background("white");
  text("score:"+score,500,50);
  if(gamestate==="play"){
    score=score+Math.round(getFrameRate()/60);
  if(keyDown("space") && (trex.y>160)){
    trex.velocityY=-15;
    jump.play();
  }
  trex.velocityY= trex.velocityY+0.8;
  if(ground.x<0 ){  
    ground.x=ground.width/2
  }
    ground.velocityX=(-4+score/100);
  
    createClouds();
  createCactus();
    if(c2group.isTouching(trex)){
      die.play();
      gamestate="end";
    }
    if(score>0 && score%100===0){
      checkpoint.play();
      
    }
  }
  
  if(gamestate==="end"){

    ground.velocityX=0;
    c1group.setVelocityXEach(0);
    c2group.setVelocityXEach(0);
    c1group.setLifetimeEach(-1);
    c2group.setLifetimeEach(-1);
    trex.changeAnimation("trexcollided1", trexcollided);
    trex.velocityY=0;
    gameover.visible=true;
  restart.visible=true;
    if(mousePressedOver(restart)){
      gamestate="play";
      score=0;
      c1group.destroyEach();
      c2group.destroyEach();
      restart.visible=false;
      gameover.visible=false;
      trex.changeAnimation("running",trex_running);
      
    }
    }
  

  
  
  trex.collide(invisibleground);
  
  //logging the y position of the trex
  
  drawSprites();
}

function createClouds(){
  if(frameCount%60===0){
  cloud=createSprite(600,100,40,10);
  cloud.y=Math.round(random(10,60));
  cloud.addImage("cloud1", movingcloud);
  cloud.velocityX=-3;
  cloud.scale=0.5;
    cloud.lifetime=300;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    c1group.add(cloud);
  }
}

function createCactus(){
  if(frameCount%60===0){
    cactus=createSprite(550,165,10,40);
    cactus.velocityX=(-4+score/100);
    var c7 = Math.round(random(1,6));
    switch (c7){
      case 1: cactus.addImage(c1);
      break;
      case 2: cactus.addImage(c2);
      break;
      case 3: cactus.addImage(c3);
      break;
      case 4: cactus.addImage(c4);
      break;
      case 5: cactus.addImage(c5);
      break;
      case 6: cactus.addImage(c6);
      break;
    }
    cactus.scale=0.5;
    cactus.lifetime=200;
   c2group.add(cactus); 
  }
}