define(function(require, exports, module) {

  'use strict';

  var Backbone = require('backbone');

  exports = module.exports = Backbone.View.extend({

    el: 'body',

    events: {
      'keydown': 'keydownListener'
    },

    constructor: function(carouselView, util, eventMediator){
      this.carouselView = carouselView;
      this.util = util;
      this.eventMediator = eventMediator;
      Backbone.View.apply(this);
    },

    render: function(){
      this.carouselView.render().$el.appendTo(this.el);
    },

    keydownListener: function(e){
            
      var keyMap = this.util.keyMap;

      switch (e.which) {
        case keyMap.del:
          this.eventMediator.trigger('delete');
          return false;
        case keyMap.enter:
          this.eventMediator.trigger('enter');
          return false;
        case keyMap.rightArrow:
          this.eventMediator.trigger('rightArrow');
          return false;
        case keyMap.leftArrow:
          this.eventMediator.trigger('leftArrow');
          return false;
      }

    }

  }, { infect: ['carouselView', 'util', 'eventMediator'] });

});