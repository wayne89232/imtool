exports.Mission = function(Sequelize, sequelize){
  return sequelize.define('Mission', {

    mission_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: Sequelize.INTEGER,
    location_id: Sequelize.INTEGER,
    title: { type: Sequelize.STRING },
    content: Sequelize.STRING,
    recruit_time: Sequelize.STRING,
    start_time: Sequelize.STRING,
    expire_time: Sequelize.STRING,
    state: {
    	type:   Sequelize.ENUM,
    	values: ['Recruiting', 'Tooling', 'Done']
    }
    
  },{
    tableName: 'mission'
  });
}