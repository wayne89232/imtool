exports.Mission = function(Sequelize, sequelize){
  return sequelize.define('Mission', {

    mission_id: { type: Sequelize.STRING, primaryKey: true,
    user_id: Sequelize.STRING,
    location_id: Sequelize.INTEGER,
    title: { type: Sequelize.STRING },
    content: Sequelize.STRING,
    photo_url: Sequelize.STRING,
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