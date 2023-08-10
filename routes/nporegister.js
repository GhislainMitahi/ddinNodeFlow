var express = require('express');
var router = express.Router();
const npoRegisterController = require('../controler/npo_register_controller.js');
// const validationdata = require('../middlwares/validationdata.js');


router.post('/api/v2/npo/clients', npoRegisterController);

module.exports = router;