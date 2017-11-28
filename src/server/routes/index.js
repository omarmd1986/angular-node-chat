var express = require('express');
var config  = require('../config');
var passport = require('../auth');

var router = express.Router();

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
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/rooms',
		failureRedirect: '/',
		failureFlash: true
}));

// 2. Login via Twitter
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/rooms',
		failureRedirect: '/',
		failureFlash: true
}));

module.exports = router;
