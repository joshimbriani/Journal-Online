var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var db = require('../app/models');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/']
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(session({secret: 'This is the best secret that ever did exist'}));
  
  passport.use(new passportLocal({
      username: 'username',
      password: 'password'
    },
  
    function(username, password, done) {
      var User = db.User;

      User.findOne({username: username}).success(function(user) {
        if (!user) {
          done(false, null, {message: "Can't find a user with that name."});
        }
        if (user.password !== password) {
          done(false, null, {message: "The passwords don't match."});
        }

        return done(null, { username: user.username});
      });
    }
  ));

  passport.validPassword = function(password){
    return this.password === password;
  }

  passport.serializeUser = function(user, done){
    done(null, user);
  };

  passport.deserializeUser = function(obj, done){
    done(null, obj);
  };
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

   
};
