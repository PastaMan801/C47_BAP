var bg,bgImg;
var player, shooterImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var alienGroup, alien, alienImg;
var bulletImg, bulletGroup, bullet;
var bullets = 100;
var gameState = "fight";

function preload(){
  
  shooterImg = loadImage("assets/BAP.png");
  bulletImg = loadImage("assets/funni_bullet_thing.png");

  bgImg = loadImage("assets/background1.jpg");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  alienImg = loadImage("assets/dat_boi1.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.5
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.25;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300);

   bullet.debug = true;
   bullet.setCollider("rectangle", 0, 0, 40, 40);
   

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

    alienGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("A")||touches.length>0){
  player.x = player.x-30
}
if(keyDown("D")||touches.length>0){
 player.x = player.x+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
  // player.addImage(shooterImg);
  if(keyWentDown("W") || keyWentDown("SPACE")){
    bullet = createSprite(player.x+10,player.y,20,10)
    bullet.addImage(bulletImg);
    
    bullet.scale = 2.25;
    bullet.velocityY = -20
    
    bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    // player.addImage(shooter_shooting)
    bullets = bullets-1
    
  }
 
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }
  
  //go to gameState "bullet" when player runs out of bullets
  if(bullets==0){
    gameState = "bullet"
      
  }
  
  //destroy the alien when bullet touches it
  if(alienGroup.isTouching(bulletGroup)){
    for(var i=0;i<alienGroup.length;i++){     
        
     if(alienGroup[i].isTouching(bulletGroup)){
          alienGroup[i].destroy()
          bulletGroup.destroyEach()
         
          } 
    
    }
  }
    
    

//player goes back to original standing image once we stop pressing the space bar
// else if(keyWentUp("space")){
  // player.addImage(shooterImg)
// }

if(alienGroup.isTouching(player)){
 

  for(var i=0;i<alienGroup.length;i++){     
       
   if(alienGroup[i].isTouching(player)){
        alienGroup[i].destroy()
        } 
  }
 }
 
 //calling the function to spawn aliens
 enemy();

drawSprites();

}

function enemy(){
  if(frameCount%100===0){

    //giving random x and y positions for alien to appear
    alien = createSprite(random(400,1500),50,40,40)

    alien.addImage(alienImg)
    alien.scale = 0.35
    alien.velocityY = 3
    alien.debug= true
    alien.setCollider("rectangle",0,0,400,250)
   
    alien.lifetime = 400
   alienGroup.add(alien)
  }
}

// function fireBullet(){
  // if(frameCount%50===0){
  // bullet= createSprite(150, width/2, 50,20);
  // bullet.x= player.x;
  // bullet.addImage(bulletImg);
  // bullet.scale=2.25;
  // bullet.velocityY= -20;
  // bulletGroup.add(bullet);
  // }
// }