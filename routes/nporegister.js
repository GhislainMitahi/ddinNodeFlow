const npoRegisterController = require('../controler/npo_register_controller.js');
const validationdata = require('../middlwares/validationdata.js');

var express = require('express');
var router = express.Router();

router.post('/ddincoreapis/pindo/api/v2/npo/clients', npoRegisterController);

module.exports = router;