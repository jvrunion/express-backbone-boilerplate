'use strict';

module.exports = {

  'post /api/panels': {
    controller: 'panelController',
    action: 'create'
  },

  'delete /api/panels/:id': {
    controller: 'panelController',
    action: 'destroy'
  }

};
/*
var Panel = require('../models/panel');

module.exports = function(app){

  app.post('/api/panels', function(req, res){
    var panel = new Panel();
    panel.save(function(err){
      if (err) throw err;
      res.send(panel);
    });
  });

  app.delete('/api/panels/:id', function(req, res){
    var id = req.params.id;
    Panel.destroy(id, function(err){
      if (err) throw err;
      console.log('Panel [%s] deleted.', id);
      res.send('');
    });

  });

};*/