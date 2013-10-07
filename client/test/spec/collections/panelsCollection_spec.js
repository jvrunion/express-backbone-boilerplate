define(function(require){

  'use strict';

  var PanelsCollection = require('collections/panelsCollection'),
    PanelModel = require('models/panelModel');

  describe('panelsCollection', function(){

    var panelsCollection;

    beforeEach(function(){
      panelsCollection = new PanelsCollection();
    });

    it('should hit /api/panels', function(){
      expect(panelsCollection.url).toBe('/api/panels');
    });

    it('should contain PanelModels', function(){
      expect(panelsCollection.model).toBe(PanelModel);
    });

  });

});