ENGINE.Car = function() {
  this.posX = 0;
  this.posY = 0;
  this.rotation = 0.0;
  this.acceleration = 0;
  this.currentMove = null;
  this.movement = {
      "w" : {
          "x" : 0,
          "y" : -1
      },
      "s" : {
          "x" : 0,
          "y" : 1
      },
      "a" : {
          "x" : -1,
          "y" : 0 
      },
      "d" : {
          "x" : 1,
          "y" : 0
      }
  };
  this.keyPressCount = 0;
  this.step = function(dt) {
    if ( this.keyPressCount > 0 ) {
        this.acceleration += 0.1;
    }
    else {
        this.acceleration -= 0.1;
    }
    this.acceleration = Math.min(Math.max(this.acceleration, 0), 10.0);
    var move = this.currentMove;
    if ( move !== null ) {
      this.posX += this.acceleration * move.x;
      this.posY += this.acceleration * move.y;
    }
  };

  this.render = function(state) {
    var app = state.app; // get reference to the application
    var layer = state.app.layer; // get reference to drawing surface
    layer.clear("#222"); //clear screen 
    layer.save(); // save all setting of drawing pointer
    layer.translate(app.center.x + this.posX, app.center.y + this.posY); //translate drawing pointer to the center of screen 
    layer.align(0.5, 0.5); //set rotation point of all sprites/images to their center 
    layer.scale(3, 3); //tell the drawing pointer to scale everything x 3 
    layer.drawImage(app.images.car_black_1, 0, 0); //draw sprite 
    layer //draw text - this is not affected by align 
      .fillStyle("#fff")
      .textAlign("center")
      .fillText("Do you remember me?", 0, 84)
      .fillText("Find me in script/Game.js", 0, 108);
    layer.restore(); //restore drawing pointer to its previous state 
  },

  this.keydown = function(event) {
    if ( event.key in this.movement ){
        this.currentMove =  this.movement[ event.key ];
    }
    this.keyPressCount += 1;
  };
  
  this.keyup = function(event) {
      this.keyPressCount -=1;
      if ( this.keyPressCount === 0 ) {
      }
  };
};
