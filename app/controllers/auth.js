var express = require('express'),
  router = express.Router();
var passport = require('passport');

module.exports = function(app) {
  app.use('/never', router);
}

module.AuthController = {
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
