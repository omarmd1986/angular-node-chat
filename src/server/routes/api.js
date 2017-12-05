'use strict'

var express = require('express');
var config  = require('../config');

var router = express.Router();

router.get('/check', function(req, res){
    // Only return true. The token is valid
    res.json(true);
});

module.exports = router;