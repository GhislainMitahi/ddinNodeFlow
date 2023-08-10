var express = require('express');
const OfficeCodeRouterController = require('../controler/officeCodeRouterController.js')

var router = express.Router();

router.get('/postal_code', OfficeCodeRouterController);

module.exports = router;