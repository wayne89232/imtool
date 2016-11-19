exports.Location = function(Sequelize, sequelize){
  return sequelize.define('Location', {

    location_id: { type: Sequelize.STRING, primaryKey: true}, 
    location: Sequelize.STRING
  },{
    tableName: 'location'
  });
}