exports.Toolship = function(Sequelize, sequelize){
  return sequelize.define('Toolship', {

    toolship_id: { type: Sequelize.STRING, primaryKey: true },
    user_id: Sequelize.STRING,
    mission_id: Sequelize.STRING,
    rating: Sequelize.INTEGER,
    feedback: Sequelize.STRING
    
  },{
    tableName: 'toolship'
  });
}