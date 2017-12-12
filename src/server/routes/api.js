'use strict'

var express = require('express');
var router = express.Router();

var config  = require('../config');

router.get('/check', function(req, res){
    // Only return true. The token is valid
    res.json(true);
});

module.exports = router;