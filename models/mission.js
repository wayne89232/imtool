exports.Mission = function(Sequelize, sequelize){
  return sequelize.define('Mission', {

    mission_id: { type: Sequelize.STRING, primaryKey: true}
    user_id: Sequelize.STRING,
    location_id: Sequelize.INTEGER,
    title: { type: Sequelize.STRING },
    content: Sequelize.STRING,
    photo_url: Sequelize.STRING,
    recruit_time: Sequelize.DATE,
    start_time: Sequelize.DATE,
    expire_time: Sequelize.DATE,
    state: {
    	type:   Sequelize.ENUM,
    	values: ['Recruiting', 'Tooling', 'Done']
    }
    
  },{
    tableName: 'mission'
  });
}