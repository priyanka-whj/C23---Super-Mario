var mario;
var platformGroup;
var marioAnimation, groundAnimation, wallAnimation, obstacleAnimation;

function preload()
{
  marioAnimation = loadAnimation("images/Capture1.png", "images/Capture3.png", "images/Capture4.png");
  groundAnimation = loadAnimation("images/ground.png");
  wallAnimation = loadAnimation("images/wall.png");
  obstacleAnimation = loadAnimation("images/obstacle1.png");
}

function setup() 
{
  createCanvas(displayWidth, 700);

  var platform, wall, obstacle;
  var distanceX = 0;
  mario = new Player();
  platformGroup = new Group();

  for(var i=0; i<40; i++)
  {
    platform = new Platform(distanceX);
    var gap = random([30, 40, 50, 60]);
    distanceX = distanceX + platform.sptw + gap;
    platformGroup.add(platform.spt);
    if(i%4 === 0)
    {
      wall = new Wall(distanceX);
      platformGroup.add(wall.spt);
    }
    if(i%3 === 0)
    {
      obstacle = new Obstacle(distanceX);
    }
  }
}

function draw() 
{
  background("skyblue"); 
  mario.applyGravity();

  mario.spt.collide(platformGroup);

  translate(-mario.spt.x + width/2, 0);

  if(keyDown("right"))
  {
    mario.moveForward();
  }

  if(keyDown("left"))
  {
    mario.moveBackward();
  }

  if(keyDown("up") && mario.spt.velocityY === 0)
  {
    mario.jump();
  }

  drawSprites();
}