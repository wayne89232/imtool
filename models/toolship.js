exports.Toolship = function(Sequelize, sequelize){
  return sequelize.define('Toolship', {

    toolship_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: Sequelize.STRING
    
  },{
    tableName: 'Toolship'
  });
}