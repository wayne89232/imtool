exports.Location = function(Sequelize, sequelize){
  return sequelize.define('Location', {

    location_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    location: Sequelize.STRING
  },{
    tableName: 'location'
  });
}