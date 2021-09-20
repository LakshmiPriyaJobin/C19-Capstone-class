var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();

  climbersGroup = new Group ();


  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
  ghost.debug = false;
  ghost.setCollider('rectangle',0, 0 ,160, 250)
invisibleBlockGroup = new Group();



  
}

function draw() {
  background(200);
  

  if(gameState === "play")
  {

     //  spookySound.play();
        if(tower.y > 400)
        {
          tower.y = 300
        }

        if(keyDown('right'))
        {
        ghost.x = ghost.x+3;
        }
        if(keyDown('left'))
        {
          ghost.x = ghost.x-3;
        }
        if(keyDown('up'))
        {
          ghost.velocityY = -5;
        }
    
    ghost.velocityY = ghost.velocityY+1;


        if(climbersGroup.isTouching(ghost))
        {
          ghost.velocityY = 0;
    
          }

                //make the ghost destroy
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600)
      {
        ghost.destroy();
        //replacement of the variable content
        gameState = "end"
      }

        //call the doors
  spawnDoors();

  drawSprites();
  
}



  if(gameState === "end")
  {
    fill('black');
    textSize(40);
    text('Game Over', 200,300);
    spookySound.stop();
    
  }

}


//creating your own function
function spawnDoors()
{
  if(frameCount % 200 === 0)
  {
      door = createSprite(200,-50,50,50);
      door.addImage("door",doorImg);

      door.x = Math.round(random(100,500))
      door.velocityY = 2;
      door.lifetime = 800;
      doorsGroup.add(door);
      ghost.depth = door.depth + 1;
 

    
      climber = createSprite(200,10);
      climber.x = door.x
      climber.addImage(climberImg);
      climber.velocityY = 2;
      climber.scale = 0.8
      climber.lifetime = 800;
      climbersGroup.add(climber);
      ghost.depth = climber.depth + 1;

      invisibleBlock = createSprite(200,20);
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY = 2;
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2
      invisibleBlock.visible = false;
      invisibleBlockGroup.add(invisibleBlock);
      invisibleBlock.lifetime = 800;


      

  }
  
}