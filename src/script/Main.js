var app = new PLAYGROUND.Application({

  smoothing: false,

  create: function() {
    // things to preload
    var colors = ["black","blue","green","red","yellow"];
    for (i = 0; i < colors.length; ++i ) {
        for (j = 1; j < 6; ++j ) {
            this.loadImage("car_"+colors[i]+"_"+j);
        }
    }
  },

  ready: function() {
    /* after preloading route events to the game state */
    this.setState(ENGINE.Game);
  }

});
