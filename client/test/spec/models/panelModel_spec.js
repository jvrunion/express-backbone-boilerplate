define(function(require){

  'use strict';

  var PanelModel = require('models/panelModel');

  describe('panelModel', function(){

    var panelModel;

    beforeEach(function(){
      panelModel = new PanelModel();
    });

    it('should have "?" as the default label', function(){
      expect(panelModel.get('label')).toBe('?');
    });

  });

});