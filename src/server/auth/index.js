'use strict';

var config 		= require('../config');
var passport 	= require('passport');

var FacebookStrategy  	= require('passport-facebook').Strategy;
var TwitterStrategy  	= require('passport-twitter').Strategy;
var GoogleStrategy 		= require('passport-google-oauth').OAuth2Strategy;

var JwtStrategy = require('passport-jwt').Strategy;

var User = require('../models/user');

/**
 * Encapsulates all code for authentication 
 * Either by using username and password, or by using social accounts
 *
 */
var init = function(){

	// Serialize and Deserialize user instances to and from the session.
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// In case of Facebook, tokenA is the access token, while tokenB is the refersh token.
	// In case of Twitter, tokenA is the token, whilet tokenB is the tokenSecret.
	var verifySocialAccount = function(tokenA, tokenB, data, done) {
		console.log(tokenA, tokenB, data);
		User.findOrCreate(data, function (err, user) {
			if (err) { return done(err); }
			return done(err, user); 
		});
	};

	// Plug-in Facebook & Twitter Strategies
	passport.use(new FacebookStrategy(config.passportFacebook, verifySocialAccount));
	passport.use(new TwitterStrategy(config.passportTwitter, verifySocialAccount));
	passport.use(new GoogleStrategy(config.passportGoogle, verifySocialAccount));

	// Authenticated request.
	passport.use(new JwtStrategy(config.jwtOptions, function(jwt_payload, done) {
		User.findOne({id: jwt_payload.sub}, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
				// or you could create a new account
			}
		});
	}));

	return passport;
}
	
module.exports = init();