module.exports = function (sequelize, DataTypes) {

  var JournalDay = sequelize.define('JournalDay', {
    dateFor: DataTypes.DATEONLY,
    dateWritten: DataTypes.DATE,
    title: DataTypes.STRING 
  }, {
    classMethods: {
      associate: function (models) {
        JournalDay.hasMany(models.Entry, {foreignKey: 'entry_id'});
      }
    }	  
  });

  return JournalDay;

}
