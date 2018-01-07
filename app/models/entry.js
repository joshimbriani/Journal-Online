module.exports = function (sequelize, DataTypes) {

  var Entry = sequelize.define('Entry', {
    question: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Entry.belongsTo(models.JournalDay, {foreignKey: 'entry_id'});
	Entry.belongsTo(models.User, {foreignKey: 'entry_id'});
      }
    }
  });  

  return Entry;
}
