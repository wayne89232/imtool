exports.Mission_skill = function(Sequelize, sequelize){
  return sequelize.define('Mission_skill', {

    mission_skill_id: { type: Sequelize.STRING, primaryKey: true}, 
    skill_id: Sequelize.STRING,
    mission_id: Sequelize.STRING
  },{
    tableName: 'mission_skill'
  });
}