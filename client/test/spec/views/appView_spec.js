define(function(require){

  'use strict';

  var infector = require('infector'),
    AppView = require('views/appView'),
    util = require('core/util');

  describe('appView', function(){

    var appView;

    beforeEach(function(){
      infector.register({
        appView: { type: AppView },
        carouselView: { value: null },
        eventMediator: { value: { trigger: jasmine.createSpy() } },
        util: { value: util }
      });
      appView = infector.get('appView');
    });

    it('should trigger the delete event when the delete key is pressed', function(){
      appView.keydownListener({ which: 8 });
      expect(infector.get('eventMediator').trigger).toHaveBeenCalledWith('delete');
    });

    it('should trigger the enter event when the enter key is pressed', function(){
      appView.keydownListener({ which: 13 });
      expect(infector.get('eventMediator').trigger).toHaveBeenCalledWith('enter');
    });

    it('should trigger the rightArrow event when the rightArrow key is pressed', function(){
      appView.keydownListener({ which: 37 });
      expect(infector.get('eventMediator').trigger).toHaveBeenCalledWith('leftArrow');
    });

    it('should trigger the leftArrow event when the rightArrow key is pressed', function(){
      appView.keydownListener({ which: 39 });
      expect(infector.get('eventMediator').trigger).toHaveBeenCalledWith('rightArrow');
    });

  });

});