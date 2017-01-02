exports.Notification = function(Sequelize, sequelize){
  return sequelize.define('Notification', {

    notification_id: { type: Sequelize.STRING, primaryKey: true },
    user_id: Sequelize.STRING,
    mission_id: Sequelize.STRING,
    type: {
    	type:   Sequelize.ENUM,
    	values: ['employed', 'fired',"mission start","mission end","volunteer"]
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    time: Sequelize.STRING
  },{
    tableName: 'notification'
  });
}