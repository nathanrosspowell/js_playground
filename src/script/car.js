ENGINE.Car = function() {
  this.controls = {
      'w' : 'forward',
      's' : 'back',
      'a' : 'left',
      'd' : 'right'
  };
  this.heldControls = {
      forward : false,
      back : false,
      left : false,
      right : false
  };
  this.pos = new Victor(0,0);
  this.turnAngle = 0.0;
  this.rotation = 0.0;
  this.speed = 0.0;
  this.acceleration = 0;
  this.brake = 0;
  this.currentMove = null;
  this.keyPressCount = 0;
  this.step = function(dt) {
    this.calculateMovement(dt);
    this.applyMovement(dt);
  };
  this.calculateMovement = function(dt) {
    var accelerationMax = 20.0;
    var breakMax = 200.0;
    var turnMax = 30.0;
    var accelerationScale = 0.5 * dt;
    var coasting = 10.0 * dt;
    var turnSpeed = 28 * dt;
    if ( this.heldControls.forward ) {
      this.acceleration += accelerationScale;
    } 
    else {
      this.acceleration -= coasting;
    }
    this.acceleration = Math.min(Math.max(this.acceleration, 0 ), accelerationMax);
    if ( this.heldControls.left ) {
      this.turnAngle -= turnSpeed;
    } 
    else if ( this.heldControls.right ){
      this.turnAngle += turnSpeed;
    }
    else {
      this.turnAngle = 0;
    }
    this.turnAngle= Math.min(Math.max(this.turnAngle, turnMax * -1 ), turnMax);
  };
  this.applyMovement = function(dt) {
    var maxSpeed = 50;
    if ( this.acceleration > 0 ) {
        this.speed += this.acceleration * dt
    }
    else {
        this.speed -= 20 * dt
    }
    this.speed = Math.min(Math.max(this.speed, 0 ), maxSpeed);
    this.rotation += this.turnAngle * dt;
    this.pos.x -= Math.sin(this.rotation) * this.speed;
    this.pos.y += Math.cos(this.rotation) * this.speed;
    console.log( this.acceleration, this.speed, this.rotation, this.pos.x, this.pos.y );
  };
  this.render = function(state) {
    var app = state.app; // get reference to the application
    var layer = state.app.layer; // get reference to drawing surface
    layer.clear("#222") //clear screen 
         .save() // save all setting of drawing pointer
         .translate(app.center.x + this.pos.x, app.center.y + this.pos.y) //translate drawing pointer to the center of screen 
         .align(0.5, 0.5) //set rotation point of all sprites/images to their center 
         .rotate(this.rotation + Math.PI)
         .scale(0.75, 0.75) 
         .drawImage(app.images.car_black_1, 0, 0) //draw sprite 
         .restore(); //restore drawing pointer to its previous state 
  },
  this.keydown = function(event) {
    if ( event.key in this.controls ) {
       this.heldControls[ this.controls[event.key] ] = true; 
    }
  };
  this.keyup = function(event) {
    if ( event.key in this.controls ) {
       this.heldControls[ this.controls[event.key] ] = false;
    }
  };
};
