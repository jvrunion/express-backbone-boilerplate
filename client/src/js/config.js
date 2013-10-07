require.config({
  baseUrl: '/src/js',
  paths: {
    infector: '/bower_components/infector/lib/infector',
    modernizr: '/bower_components/modernizr/modernizr',
    jquery: '/bower_components/jquery/jquery',
    underscore: '/bower_components/underscore/underscore',
    backbone: '/bower_components/backbone/backbone',
    handlebars: '/bower_components/handlebars/handlebars',
    text: '/bower_components/requirejs-text/text'
  },
  shim: {
    'infector': {
      deps: ['underscore'],
      exports: 'Infector',
      init: function(){
        'use strict';
        return new Infector();
      }
    },
    'modernizr': {
      exports: 'Modernizr'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});