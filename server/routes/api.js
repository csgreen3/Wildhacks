(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.use('/tower', require('./tower'));  
  router.use('/car', require('./car'));  

  module.exports = router;

})();

