exports.Skill = function(Sequelize, sequelize){
  return sequelize.define('Skill', {

    skill_id: { type: Sequelize.STRING, primaryKey: true}, 
    skill: Sequelize.STRING
  },{
    tableName: 'skill'
  });
}