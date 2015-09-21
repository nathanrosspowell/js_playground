ENGINE.Game = {
  car1: new ENGINE.Car(),

  create: function() {
  },

  step: function(dt) {
      this.car1.step(dt);
  },

  render: function() {
      this.car1.render(this);
  },

  keydown: function(event) {
      this.car1.keydown(event);
  },
  
  keyup: function(event) {
      this.car1.keyup(event);
  }
};
