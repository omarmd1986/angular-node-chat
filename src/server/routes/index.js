'use strict'

var express = require('express');
var config  = require('../config');
var passport = require('../auth');
var sprintf = require('sprintf-js').sprintf;

let User = require('../models/user');

var router = express.Router();

let opts = {
	assignProperty: config.jwtPtrHolder,
	failureRedirect: '/login',
	failureFlash: true
};

let redirectFn = function(req, res){
	if(!req[config.jwtPtrHolder]){
		return res.redirect('/login');
	}
	let url = sprintf(config.tokenAcceptCallback, req[config.jwtPtrHolder]);
	return res.redirect(url);
};

let catchFn = function(req, res, next){

};

// Social Authentication routes
// 1. Login via Facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', opts), redirectFn);

// 2. Login via Twitter
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', opts), redirectFn);

// 3. Login via Google
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback', passport.authenticate('google', opts), redirectFn);

module.exports = router;
