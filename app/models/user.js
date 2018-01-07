module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.Entry, {foreignKey: 'entry_id'});
        }
      }
  });

  return User;
};
