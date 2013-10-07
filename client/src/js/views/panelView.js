define(function(require, exports, module) {

  'use strict';

  var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    panelTemplate = require('text!templates/panel.handlebars');

  exports = module.exports = Backbone.View.extend({

    constructor: function(panelModel){
      this.panelModel = panelModel;
      Backbone.View.apply(this);
    },

    initialize: function(){
      this.panelModel.on('destroy', this.remove, this);
      this.panelTemplate = Handlebars.compile(panelTemplate);
    },

    render: function(){
      this.setElement(this.panelTemplate(this.panelModel.toJSON()));
      return this;
    }

  }, { infect: ['panelModel'] });

});