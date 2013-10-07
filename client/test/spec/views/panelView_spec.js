define(function(require){

  'use strict';

  var infector = require('infector'),
    Backbone = require('backbone'),
    PanelView = require('views/panelView');

  describe('panelView', function(){

    var panelView;

    beforeEach(function(){
      infector.register({
        panelModel: { type: Backbone.Model.extend() },
        panelView: { type: PanelView }
      });
      panelView = infector.get('panelView');
    });

    it('should remove itself when it\'s panelModel is destroyed', function(){
      spyOn(panelView, 'remove');
      // Reinitialize so we bind the spy to the destroy event.
      panelView.initialize();
      panelView.panelModel.trigger('destroy');
      expect(panelView.remove).toHaveBeenCalled();
    });

  });

});