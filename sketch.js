  var trex,ground,im,cloud,ob1,gs1="play",score=0 ,touches=[];
function preload(){
  t1=loadAnimation("trex1.png","trex3.png","trex4.png");
  g1=loadAnimation("ground2.png");
  c1=loadAnimation("cloud.png")
  o1=loadAnimation("obstacle1.png");
   o2=loadAnimation("obstacle2.png");
   o3=loadAnimation("obstacle3.png");
   o4=loadAnimation("obstacle4.png");
   o5=loadAnimation("obstacle5.png");
   o6=loadAnimation("obstacle6.png");
checkpoint=loadSound ("checkPoint.mp3") 
  die=loadSound("die.mp3") 
reset=loadImage("restart.png");
go=loadImage("gameOver.png");
     tre=loadAnimation("trex_collided.png");
 
}

function setup() {
  createCanvas(windowWidth ,windowHeight);
  trex=createSprite(width/2,height/2,20,20);
  trex.addAnimation("t1",t1);
  trex.addAnimation("tc",tre);
  trex.scale=0.7;
  ground=createSprite(width/2,height/2+50,400,5);
  ground.addAnimation("g1",g1);
  im=createSprite(width/2,height/2+55,width,5);
  im.visible=false;
  obg=new Group();
cg=new Group();
resetS=createSprite(width/2,height/2-50,20,20);
    resetS.addImage(reset);
    resetS.scale=0.5;
    gov=createSprite(width/2,height/2-100,20,20);
    gov.addImage(go);
    gov.scale=0.4;
  ground.velocityX=-6; 
}

function draw() {
  background("white");
  text("score"+score,width-50,10);
    trex.collide(im);

  
    if(gs1=="play"){
    if((keyDown("space")|| touches.length>0)&&trex.y>height/2){
     trex.velocityY=-15 ;
      touches=[];
     }
      resetS.visible=false;
      gov.visible=false;
  trex.velocityY=trex.velocityY+0.5;
 
  if(ground.x<=0){
    ground.x=width/2;
   }

    trex.changeAnimation("t1",t1);
      
score++;
      
  if(frameCount %60==0){
    cloud=createSprite(width,height/4);
     cloud.addAnimation("c1",c1);
cloud.velocityX=-3;
    cloud.depth=0.5;
    cloud.y=Math.round( random(height/8,height/4));
    cg.add(cloud);
  }//end of clouds
 if(score%200==0){
   ground.velocityX+=1;
   obg.setVelocityXEach(ground.velocityX)
 }
  if(frameCount %150==0){
    ob1=createSprite(width,ground.y-20);
    ob1.addAnimation("o1",o1);
ob1.scale=0.6;
    ob1.velocityX=ground.velocityX;
   var r=Math.round(random(1,6));
    switch(r){
      case 1:ob1.addAnimation("o1",o1);
        break;
        case 2:ob1.addAnimation("o1",o2); 
        break;
        case 3:ob1.addAnimation("o1",o3); 
        break;
        case 4:ob1.addAnimation("o1",o4); 
        break;
        case 5:ob1.addAnimation("o1",o5); 
        break;
        case 6:ob1.addAnimation("o1",o6); 
        break;
        default:break;
    }// end of switch case
    obg.add(ob1);
  }// end of obstacle
if(trex.isTouching(obg)){
  gs1="end";
  die.play();
}
  }
  
  if(gs1=="end"){
    ground.velocityX=0;
    obg.setVelocityXEach(0);
    cg.setVelocityXEach(0);
    resetS.visible=true;
      gov.visible=true;
      trex.changeAnimation("tc",tre);
trex.velocityY=0;    
    if(mousePressedOver(resetS)||touches.length>0){
      gs1="play";
      obg.destroyEach();
      score=0;
      ground.velocityX=-6 ;
      touches=[];
      cg.destroyEach();
    }
    
      }
  
  drawSprites();
}