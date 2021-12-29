//Ocorreu o mesmo problema anterior. O Txt aparece por trás das sprites mesmo estando sobre as ultimas camadas do código... Possivelmente seja C++... Podemos ver isso na aula?
// Deixei o chão invisivel por conta disso para vermos se possível depois!
var path,boy,cash,diamonds,jewelry,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("floor.jpg");
  boyImg = loadAnimation("a1.png","a2.png","a3.png");
  cashImg = loadImage("star.png");
  diamondsImg = loadImage("star.png");
  jewelryImg = loadImage("star.png");
  swordImg = loadImage("rock.png");
  endImg =loadAnimation("fimdeJogo.png");
}

function setup(){
  
  createCanvas(400,600);

//path=createSprite(200,200);
//path.addImage(pathImg);
//path.velocityY = 4;

boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.3;
boy.setCollider("circle",10,-15,140)
  
cashG=new Group();
diamondsG=new Group();
jewelryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //if(path.y > 400 ){
  //  path.y = height/4;
  //}
  
    createCash();
    createDiamonds();
    createjewelry();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(boy.isTouching(jewelryG)) {
      jewelryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.collide(swordGroup);
        textSize(40)
        fill("red")
        text("Game Over",110,200);
         //cashG.destroyEach();
         //diamondsG.destroyEach();
         //jewelryG.destroyEach();
         //swordGroup.destroyEach();
        
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Points: "+ treasureCollection,10,30);
  }

}

function createCash() {
  if (World.frameCount % 260 == 0) {
  var cash = createSprite(Math.round(random(50, 350),0, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.2;
  cash.velocityY = 3;
  cash.lifetime = 260;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 210 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.2;
  diamonds.velocityY = 3;
  diamonds.lifetime = 260;
  diamondsG.add(diamonds);
}
}

function createjewelry() {
  if (World.frameCount % 400 == 0) {
  var jewelry = createSprite(Math.round(random(50, 350),0, 10, 10));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.2;
  jewelry.velocityY = 3;
  jewelry.lifetime = 260;
  jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),-40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.3;
  sword.velocityY = 3;
  sword.lifetime = 260;
  swordGroup.add(sword);
  sword.debug=true;
  }
}

function getOff1(boy,jewelry){
  jewelry.destroy();
   treasureCollection= treasureCollection + 150;
}