const userLoginController = require('../controler/user_login_controller.js');


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/v1/agent/auth', userLoginController);

module.exports = router;
