var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/patches', function(req, res, next) {
  console.log("Got a file tree request")
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
});

router.put('/patch', function(req, res, next) {
  console.log("Got a file tree request")
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
});

module.exports = router;
