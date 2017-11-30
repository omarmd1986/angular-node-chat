'use strict'

var express = require('express');
var config  = require('../config');

var router = express.Router();

router.get('/check', function(req, res){
    res.json({});
});

module.exports = router;