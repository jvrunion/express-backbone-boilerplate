require([
  'infector',
  'collections/panelsCollection',
  'core/eventMediator',
  'core/util',
  'models/panelModel',
  'views/appView',
  'views/carouselView',
  'views/panelView'
], function(
  infector,
  PanelsCollection,
  eventMediator,
  util,
  PanelModel,
  AppView,
  CarouselView,
  PanelView
){
  
  'use strict';

  infector.register({
    panelsCollection: { type: PanelsCollection },
    eventMediator: { value: eventMediator },
    util: { value: util },
    panelModel: { type: PanelModel },
    appView: { type: AppView },
    carouselView: { type: CarouselView },
    panelView: { type: PanelView }
  });

  infector.get('appView').render();

});