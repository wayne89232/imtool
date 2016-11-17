exports.Skill = function(Sequelize, sequelize){
  return sequelize.define('Skill', {

    skill_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    skill: Sequelize.STRING
  },{
    tableName: 'skill'
  });
}