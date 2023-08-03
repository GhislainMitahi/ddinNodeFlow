const npoRegisterController = require('../controler/npo_register_controller.js');
const validationdata = require('../middlwares/validationdata.js');

var express = require('express');
var router = express.Router();

router.post('/api/v2/npo/clients', npoRegisterController);

module.exports = router;