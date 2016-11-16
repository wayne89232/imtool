exports.Mission = function(Sequelize, sequelize){
  return sequelize.define('Mission', {

    mission_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: Sequelize.STRING },
    content: Sequelize.STRING,
    tools: Sequelize.STRING,
    state: {
    	type:   Sequelize.ENUM,
    	values: ['Available', 'Tooling', 'Done']
    }
    
  },{
    tableName: 'Mission'
  });
}