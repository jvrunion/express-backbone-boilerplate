define(function(require, exports, module) {

  'use strict';

  var _ = require('underscore'),
    Backbone = require('backbone');
  
  // A simple event mediator, see http://backbonejs.org/#Events
  exports = module.exports = _.clone(Backbone.Events);

});