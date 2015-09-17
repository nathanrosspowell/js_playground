var app = new PLAYGROUND.Application({

  smoothing: false,

  create: function() {

    /* things to preload */

    this.loadImage("car_black_1");

  },

  ready: function() {

    /* after preloading route events to the game state */

    this.setState(ENGINE.Game);

  }

});
