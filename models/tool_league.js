exports.Tool_league = function(Sequelize, sequelize){
  return sequelize.define('Tool_league', {

    tool_league_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    league_name: Sequelize.STRING,
    
    
  },{
    tableName: 'Tool_league'
  });
}