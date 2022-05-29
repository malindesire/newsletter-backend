const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection("users").find().toArray()
  .then(results => {
    console.log(results);

  });


  res.send('respond with a resource');
});

module.exports = router;
