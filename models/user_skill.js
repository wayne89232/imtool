exports.User_skill = function(Sequelize, sequelize){
  return sequelize.define('User_skill', {

    user_skill_id: { type: Sequelize.STRING, primaryKey: true}, 
    skill_id: Sequelize.STRING,
    user_id: Sequelize.STRING
  },{
    tableName: 'user_skill'
  });
}