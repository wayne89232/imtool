exports.Mission = function(Sequelize, sequelize){
  return sequelize.define('Mission', {

    mission_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: Sequelize.STRING },
    content: Sequelize.STRING,
    user_id: Sequelize.STRING
    
  },{
    tableName: 'Mission'
  });
}