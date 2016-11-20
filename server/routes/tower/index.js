(function() {
  'use strict';

  var express = require('express');
  var controller = require('./tower.controller')    
    
  var router = express.Router();

  router.get('/', controller.getAll);
  router.post('/', controller.create);
  router.get('/getNew', controller.getNew);

  module.exports = router;

})();