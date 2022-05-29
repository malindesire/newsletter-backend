const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send('respond with a resource');
});

module.exports = router;
