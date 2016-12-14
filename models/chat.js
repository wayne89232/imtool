exports.Chat = function(Sequelize, sequelize){
  return sequelize.define('Chat', {

    chat_id: { type: Sequelize.STRING, primaryKey: true },
    user_id: Sequelize.STRING,
    mission_id: Sequelize.STRING,
    content: Sequelize.STRING,
    time: Sequelize.STRING
  },{
    tableName: 'chat'
  });
}