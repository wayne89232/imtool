exports.User_skill = function(Sequelize, sequelize){
  return sequelize.define('User_skill', {

    user_skill_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    skill_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
  },{
    tableName: 'user_skill'
  });
}