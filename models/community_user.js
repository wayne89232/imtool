exports.Community_user = function(Sequelize, sequelize){
  return sequelize.define('Community_user', {

    community_user_id: { type: Sequelize.STRING, primaryKey: true}, 
	community_id: Sequelize.STRING,
    user_id: Sequelize.STRING
  },{
    tableName: 'community_user'
  });
}