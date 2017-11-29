'use strict'

var express = require('express');
var config  = require('../config');
var passport = require('../auth');
var sprintf = require('sprintf-js').sprintf;

let User = require('../models/user');

var router = express.Router();

let opts = {
	assignProperty: config.jwtPtrHolder,
	failureFlash: true
};

let redirectFn = function(req, res){
	if(!req[config.jwtPtrHolder]){
		req.flash('error', 'JWT not found!');
		return res.redirect('/login');
	}
	let url = sprintf(config.tokenAcceptCallback, req[config.jwtPtrHolder]);
	return res.redirect(url);
};

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', {
      	title : config.title,
		success: req.flash('success')[0],
		errors: req.flash('error')
	});
});

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

// Secure Page example
router.post('/secure', passport.authenticate('jwt'), function(req, res){
	res.send('Secure page');
});

// Just for now... Angular APP should get the token.
router.get('/jwt/callback', function(req, res){
	res.send(req.query.token);
});

module.exports = router;
