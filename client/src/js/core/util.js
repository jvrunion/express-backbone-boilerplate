define(function(require, exports, module) {

  'use strict';
  
  var degreesPerRadian = 360 / (2 * Math.PI);

  exports = module.exports = {

    // Converts degrees to radians.
    getRadians: function(degrees){
      return degrees / degreesPerRadian;
    },

    // Generates a random RGBA string.
    getRandomRGBA: function(alpha){
      var rand = function(){ return Math.floor(Math.random() * (255 + 1)); };
      alpha = alpha || 1;
      return 'rgba(' + rand() + ', ' + rand() + ', ' + rand() + ', ' + alpha + ')';
    },

    // Maps key names to key codes.
    keyMap: {
      del: 8,
      enter: 13,
      leftArrow: 37,
      rightArrow: 39
    }

  };

});