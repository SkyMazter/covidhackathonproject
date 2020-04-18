/*Ignore errors- that is a fault of glitch- not p5*/
//start location and speed for player
var START_LOCATION_X = 100;
var START_LOCATION_Y = 445;
var PLAYER_LEFT_SPEED = 10;
var PLAYER_RIGHT_SPEED = 15;
var PLAYER_JUMP = 150;
var GRAVITY = 10;

//start location for viruses
var xloc = 200;
var yloc = 100;

//speed constants for all viruses.
var VIRUS_XSPEED = 10;
var VIRUS_YSPEED = 10;

var time = 30;

let losescreen;
let winscreen;

var virus1;
var virus2;
var virus3;

var player;

function setup() {
  //create canvas
  createCanvas(windowWidth - 100, windowHeight - 100);
  textSize(36);

  losescreen = loadImage(
    "https://cdn.glitch.com/cfee1255-c37d-432c-863a-5cca7f3af4be%2Flose.png?v=1587075937045"
  );
  winscreen = loadImage(
    "https://cdn.glitch.com/cfee1255-c37d-432c-863a-5cca7f3af4be%2Fwin.png?v=1587075932787"
  );

  //create new Corona Virus objects
  virus1 = new Virus(xloc, yloc, VIRUS_XSPEED, VIRUS_YSPEED);
  virus2 = new Virus(xloc + 170, yloc + 150, VIRUS_XSPEED, VIRUS_YSPEED);
  virus3 = new Virus(xloc - 100, yloc + 180, VIRUS_XSPEED, VIRUS_YSPEED);

  //create Player object
  player = new Player(START_LOCATION_X, START_LOCATION_Y);
} //setup

function draw() {
  //clear the background
  resetMatrix();
  background(207, 250, 247);
  // player(startlocationx, startlocationy);
  fill(0, 0, 255);
  text("Time: " + time, 15, 30);

  //Draw viruses
  virus1.draw();
  virus2.draw();
  virus3.draw();

  //Ask viruses to change their location.
  //On the next loop they will draw with the new location.
  virus1.move();
  virus2.move();
  virus3.move();

  //Respond to left and right arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }
  //draw the player
  player.draw();

  //Update the timer
  if (frameCount % 60 == 0 && time > 0) {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    time--;
  }
  //Times up. Game Over!!!
  if (time === 0) {
    noLoop(); /* game over*/
    clear();
    background(winscreen);
  }

  //Check for player infection
  if (isPlayerInfected()) {
    noLoop(); /* game over*/
    clear();
    background(losescreen);
  }
} //draw

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.jump();
  }
}

function isPlayerInfected() {
  let d = int(dist(virus1.getX(), virus1.getY(), player.getX(), player.getY()));
  if (d <= 115) {
    return true;
  }

  d = int(dist(virus2.getX(), virus2.getY(), player.getX(), player.getY()));
  if (d <= 115) {
    return true;
  }

  d = int(dist(virus3.getX(), virus3.getY(), player.getX(), player.getY()));
  if (d <= 115) {
    return true;
  }

  return false;
}
/*Spinning Square object*/
function Virus(x, y, xspeed, yspeed) {
  //each virus object has a its own copy of these variables
  this.x = x;
  this.y = y;
  this.xs = xspeed;
  this.ys = yspeed;

  //this functions draws the virus
  this.draw = function() {
    push();

    /* Virus */
    /* Germ Lines*/
    strokeWeight(1);
    stroke(242, 24, 0);
    fill(242, 24, 0);

    //bottom stems
    for (let i = -15; i < 50; i += 15) {
      line(this.x - 20, this.y, this.x + i, this.y + 50);
      ellipse(this.x + i, this.y + 50, 10, 15);
    }
    //right stems
    for (let i = 0; i < 50; i += 15) {
      line(this.x, this.y - 10, this.x + 50, this.y + i);
      ellipse(this.x + 50, this.y + i, 10, 15);
    }
    //left stems
    for (let i = 0; i < 60; i += 15) {
      line(this.x, this.y - 10, this.x - 50, this.y + i);
      ellipse(this.x - 50, this.y + i, 10, 15);
    }
    //top stems
    for (let i = -20; i < 60; i += 15) {
      line(this.x - 20, this.y - 10, this.x + i, this.y - 50);
      ellipse(this.x + i, this.y - 50, 10, 15);
    }

    /*Body*/
    stroke(0, 0, 0);
    fill(255, 238, 186);
    ellipse(this.x, this.y, 50);
    /*Eyes*/
    fill(255, 255, 255);
    ellipse(this.x - 10, this.y - 10, 10, 30);
    ellipse(this.x + 20, this.y - 10, 10, 30);
    fill(0, 0, 0);
    ellipse(this.x - 10, this.y, 10);
    ellipse(this.x + 20, this.y, 10);

    /*eyebrows*/
    stroke(0, 0, 0);
    strokeWeight(4);
    line(this.x - 20, this.y - 30, this.x, this.y - 20);
    line(this.x + 25, this.y - 30, this.x + 15, this.y - 20);

    pop();
  };

  //this function updates the virus' coordinates.
  this.move = function() {
    this.x += this.xs;
    this.y += this.ys;

    //if the virus hits the right boundary
    if (this.x >= width) {
      this.xs = this.xs * -1; //change direction
    }
    //if the virus hits the left boundary
    if (this.x < 0) {
      this.xs = this.xs * -1;
    }
    //if logo hits bottom boundary
    if (this.y >= height) {
      this.ys = this.ys * -1; /*change direction*/
    }
    if (this.y < 0) {
      this.ys = this.ys * -1;
    }
  };

  //this function returns the x location of the player
  //this is used to check if the player is infected.
  this.getX = function() {
    return this.x;
  };

  //this function returns the y location of the player
  //this is used to check if the player is infected.
  this.getY = function() {
    return this.y;
  };
} //end of virus

function Player(x, y) {
  this.x = x;
  this.y = y;

  //this function draws the Player
  this.draw = function() {
    //if player is above the ground apply gravity
    //START_LOCATION_Y is the ground
    if (this.y < START_LOCATION_Y) {
      this.y += GRAVITY;

      if (this.y > START_LOCATION_Y) {
        this.y = START_LOCATION_Y;
      }
    }

    /* hair */
    fill(0, 0, 0);
    ellipse(this.x, this.y, 55, 150);
    /*head*/
    fill(227, 183, 95);
    ellipse(this.x, this.y, 100, 100);
    beginShape();
    /*bangs*/
    fill(0, 0, 0);
    arc(this.x, this.y - 10, 100, 80, PI, 0);
    /*body*/
    fill(169, 128, 176);
    vertex(this.x - 50, this.y + 50);
    vertex(this.x + 50, this.y + 50);
    vertex(this.x + 35, this.y + 150);
    vertex(this.x - 35, this.y + 150);
    endShape(CLOSE);
    /*legs*/
    fill(255, 255, 255);
    rect(this.x, this.y + 150, 36, 100);
    rect(this.x - 36, this.y + 150, 36, 100);
    /*arms*/
    fill(180, 220, 240);
    triangle(
      this.x - 50,
      this.y + 50,
      this.x - 100,
      this.y + 150,
      this.x - 35,
      this.y + 150
    );
    triangle(
      this.x + 50,
      this.y + 50,
      this.x + 100,
      this.y + 150,
      this.x + 35,
      this.y + 150
    );
    /*hands*/
    fill(227, 183, 95);
    arc(this.x - 65, this.y + 150, 45, 45, 0, PI);
    arc(this.x + 65, this.y + 150, 45, 45, 0, PI);
    /*masks*/
    fill(255, 255, 255);
    rect(this.x - 25, this.y, 50, 35);
    line(this.x - 25, this.y, this.x - 49, this.y - 20);
    line(this.x + 25, this.y, this.x + 49, this.y - 20);
    line(this.x - 25, this.y + 35, this.x - 30, this.y + 40);
    line(this.x + 25, this.y + 35, this.x + 30, this.y + 40);
  };

  //this function moves the player left
  //and checks for the left boundary and bounces if needed.
  this.moveLeft = function() {
    this.x -= PLAYER_LEFT_SPEED;
    if (this.x <= 0) {
      this.x = 100;
    }
  };

  //this function moves the player right
  //and checks for the right boundary and bounces if needed
  this.moveRight = function() {
    this.x += PLAYER_RIGHT_SPEED;
    if (this.x >= width) {
      this.x = width - 100;
    }
  };

  //this function is called to make the player jump
  //it assumes that the START_LOCATION_Y is the ground.
  this.jump = function() {
    if (this.y == START_LOCATION_Y) {
      this.y -= PLAYER_JUMP;
    }
  };

  //this function returns the x location of player
  //this is used to check if the player is infected.
  this.getX = function() {
    return this.x;
  };

  //this function returns the y location of the player
  //this is used to check if the player is infected.
  this.getY = function() {
    return this.y;
  };
}
