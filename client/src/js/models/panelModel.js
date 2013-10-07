define(function(require, exports, module) {

  'use strict';

  var Backbone = require('backbone');

  exports = module.exports = Backbone.Model.extend({
    defaults: { label: '?' }
  });

});