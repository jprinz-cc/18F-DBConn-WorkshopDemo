var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/apiController');

router.get('/media/:mediaID', api_controller.media_list);


module.exports = router;
