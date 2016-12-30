exports.Community_chatlog = function(Sequelize, sequelize){
  return sequelize.define('Community_chatlog', {

    community_chatlog_id: { type: Sequelize.STRING, primaryKey: true },
    user_id: Sequelize.STRING,
    community_id: Sequelize.STRING,
    content: Sequelize.STRING,
    time: Sequelize.STRING
  },{
    tableName: 'community_chatlog'
  });
}