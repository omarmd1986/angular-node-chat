'use strict';

var config 		= require('../config');
var passport 	= require('passport');
var jsonwebtoken = require('jsonwebtoken');

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
	passport.serializeUser(function(token, done) {
		done(null, token);
	});

	// passport.deserializeUser(function(to, done) {
	// 	User.findById(id, function (err, user) {
	// 		done(err, user);
	// 	});
	// });

	// In case of Facebook, tokenA is the access token, while tokenB is the refersh token.
	// In case of Twitter, tokenA is the token, whilet tokenB is the tokenSecret.
	var verifySocialAccount = function(tokenA, tokenB, data, done) {
		User.findOrCreate(data, function (err, user) {
			if (err) { return done(err); }
			// Create a new JWT.
			// This token will be assign to the request body
			// We return to an angular page passing the JWT
			// Angular will keep this token to future request.
			jsonwebtoken.sign({
				id: user.id,
				picture: user.picture,
				socialId: user.socialId,
				userName: user.username
				// more params here to know what the user can do.
			}, config.jwtSecret, config.jwtOptions, done);
		});
	};

	// Plug-in Facebook & Twitter Strategies
	passport.use(new FacebookStrategy(config.passportFacebook, verifySocialAccount));
	passport.use(new TwitterStrategy(config.passportTwitter, verifySocialAccount));
	passport.use(new GoogleStrategy(config.passportGoogle, verifySocialAccount));

	// Authenticated request.
	// The token generated in verifySocialAccount
	passport.use(new JwtStrategy(config.passportJwtOptions, function(jwt_payload, done) {
		User.findOne({_id: jwt_payload.id}, done);
	}));

	return passport;
}
	
module.exports = init();