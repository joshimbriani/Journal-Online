var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'journal'
    },
    port: 3000,
    db: 'postgres://localhost/journal-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'journal'
    },
    port: 3000,
    db: 'postgres://localhost/journal-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'journal'
    },
    port: 3000,
    db: 'postgres://localhost/journal-production'
  }
};

module.exports = config[env];
