exports.User_location = function(Sequelize, sequelize){
  return sequelize.define('User_location', {

    user_location_id: { type: Sequelize.STRING, primaryKey: true}, 
    location_id: Sequelize.STRING,
    user_id: Sequelize.STRING
  },{
    tableName: 'user_location'
  });
}