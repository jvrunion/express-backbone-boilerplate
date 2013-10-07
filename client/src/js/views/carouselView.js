define(function(require, exports, module) {

  'use strict';

  var Modernizr = require('modernizr'),
    Backbone = require('backbone'),
    carouselTemplate = require('text!templates/carousel.handlebars'),
    PanelView = require('views/panelView');

  exports = module.exports = Backbone.View.extend({

    constructor: function(panelsCollection, eventMediator, util){
      this.panelsCollection = panelsCollection;
      this.eventMediator = eventMediator;
      this.util = util;
      Backbone.View.apply(this);
    },

    initialize: function(){

      this.panelsCollection.on('reset', this._addPanels, this);
      this.panelsCollection.on('add', this._addPanel, this);
      this.panelsCollection.on('remove', this._removePanel, this);

      this.eventMediator.on('delete', this._deleteHandler, this);
      this.eventMediator.on('enter', this._enterHandler, this);
      this.eventMediator.on('rightArrow', this._rightArrowHandler, this);
      this.eventMediator.on('leftArrow', this._leftArrowHandler, this);

      this.panelOpacity = 0.9;
      this.carouselRotation = 0;
      this.panelRotation = 0;

    },

    render: function(){
      this.setElement(carouselTemplate);
      this.$carouselInner = this.$('.carousel-inner');
      this.carouselInner = this.$carouselInner.get(0);
      return this;
    },

    remove: function(){
      this.panelsCollection.off(null, null, this);
      this.eventMediator.off(null, null, this);
    },

    _addPanel: function(panelModel){

      var panelView = new PanelView(panelModel);

      panelView.render().$el
        .appendTo(this.$carouselInner)
        .css('background-color', this.util.getRandomRGBA(this.panelOpacity));

      this._repositionPanels();
      this.carouselRotation = this.panelRotation;
      this._rotate();

    },

    _addPanels: function(){
      this.panelsCollection.each(this._addPanel, this);
    },

    _adjustPanelTransformString: function(carouselView, translate){
      return function(i){
        var rotateY = i * carouselView.panelRotation;
        this.style[Modernizr.prefixed('transform')] = 'rotateY(' + rotateY +
          'deg) translateZ(' + translate + 'px)';
      };
    },

    _deleteHandler: function(){
      this.panelsCollection.pop();
    },

    _enterHandler: function(){
      var label = this.panelsCollection.models.length + 1;
      this.panelsCollection.create({
        label: '' + label
      });
    },

    _leftArrowHandler: function(){
      this.carouselRotation -= this.panelRotation;
      this._rotate(this.carouselRotation);
    },

    _rightArrowHandler: function(){
      this.carouselRotation += this.panelRotation;
      this._rotate(this.carouselRotation);
    },

    _removePanel: function(panelModel){
      panelModel.destroy();
      this._repositionPanels();
      this.carouselRotation = this.panelRotation;
      this._rotate();
    },

    _repositionPanels: function(){

      var $panels = this.$('.panel'),
        numPanels = $panels.length,
        translate;

      if (numPanels === 1) {
        this.panelRotation = translate = 0;
      } else {
        this.panelRotation = 360 / numPanels;
        translate = 105 / Math.tan(this.util.getRadians(this.panelRotation / 2));
      }

      $panels.each(this._adjustPanelTransformString(this, translate));

    },

    _rotate: function(){
      this.carouselInner.style[Modernizr.prefixed('transform')] = 'rotateY(' +
        this.carouselRotation + 'deg)';
    }

  }, { infect: ['panelsCollection', 'eventMediator', 'util'] });

});