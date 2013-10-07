define(function(require){

  'use strict';

  var infector = require('infector'),
    eventMediator = require('core/eventMediator'),
    CarouselView = require('views/carouselView'),
    PanelsCollection = require('collections/panelsCollection'),
    util = require('core/util');

  describe('carouselView', function(){

    var carouselView;

    beforeEach(function(){
      infector.register({
        carouselView: { type: CarouselView },
        panelsCollection: { type: PanelsCollection },
        eventMediator: { value: eventMediator },
        util: { value: util }
      });
      carouselView = infector.get('carouselView');
      carouselView.render();
    });

    afterEach(function(){
      carouselView.remove();
    });

    it('should add a panel when enter is pressed', function(){
      carouselView._rotate = function(){};
      eventMediator.trigger('enter');
      expect(carouselView.panelsCollection.at(0).get('label')).toBe('1');
    });

    it('should remove a panel when delete is pressed', function(){
      carouselView.panelsCollection.create({ label: 1 });
      eventMediator.trigger('delete');
      expect(carouselView.panelsCollection.models).toEqual([]);
    });

    it('should rotate the carousel to the right when the right arrow is pressed', function(){
      carouselView.panelsCollection.add([{ label: 1 }, { label: 2 }, { label: 3 }]);
      eventMediator.trigger('rightArrow');
      expect(carouselView.carouselInner.style.cssText).toMatch(/rotateY\(240deg\)/);
    });

    it('should rotate the carousel to the left when the left arrow is pressed', function(){
      carouselView.panelsCollection.add([{ label: 1 }, { label: 2 }, { label: 3 }]);
      eventMediator.trigger('leftArrow');
      expect(carouselView.carouselInner.style.cssText).toMatch(/rotateY\(0deg\)/);
    });

    it('should give the panel a random colour when it is created', function(){
      var util = infector.get('util');
      util.getRandomRGBA = jasmine.createSpy();
      carouselView._rotate = function(){};
      eventMediator.trigger('enter');
      expect(util.getRandomRGBA).toHaveBeenCalledWith(carouselView.panelOpacity);
    });

  });

});