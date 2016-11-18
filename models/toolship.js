exports.Toolship = function(Sequelize, sequelize){
  return sequelize.define('Toolship', {

    toolship_id: { type: Sequelize.STRING, primaryKey: true, autoIncrement: true },
    user_id: Sequelize.INTEGER,
    mission_id: Sequelize.INTEGER,
    rating: Sequelize.INTEGER,
    feedback: Sequelize.STRING
    
  },{
    tableName: 'toolship'
  });
}