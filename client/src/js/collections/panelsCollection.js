define(function(require, exports, module) {
  
  'use strict';

  var Backbone = require('backbone'),
    PanelModel = require('models/panelModel');

  exports = module.exports = Backbone.Collection.extend({
    url: '/api/panels',
    model: PanelModel
  });

});