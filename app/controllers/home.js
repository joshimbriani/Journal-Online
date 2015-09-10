var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });	
});

var AuthController = {
	  login: passport.authenticate('local', {
			     successRedirect: 'auth/login/success',
	      failureRedirect: 'auth/login/failure'
		    }),
	    loginSuccess: function(req, res) {
				      res.json({success: true, user: req.session.passport.user});
				        },
	      loginFailure: function(req, res) {
				        res.json({success: false, message: 'Login failed'});
					  },
	        logout: function(req, res) {
				    req.logout();
				        res.end();
			}
};

router.post('/login', AuthController.login);

router.get('/logout', AuthController.logout);

router.get('/auth/login/success', AuthController.loginSuccess);

router.get('/auth/login/failure', AuthController.loginFailure);
