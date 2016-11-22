exports.User = function(Sequelize, sequelize){
  return sequelize.define('User', {
    user_id: { type: Sequelize.STRING, primaryKey: true }, 
	account: Sequelize.STRING,
	password: Sequelize.STRING,
	gender: {
    	type:   Sequelize.ENUM,
    	values: ['B', 'G']
    },
	photo_url: Sequelize.STRING,
	user_name: Sequelize.STRING,
	email: Sequelize.STRING

  },{
    tableName: 'user'
  });
}