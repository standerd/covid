var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/post', function(req, res, next) {
  console.log("Received a request");
  // res.render('index', { title: 'Express' });
  res.json({message: "Hello world!"});
});

module.exports = router;
