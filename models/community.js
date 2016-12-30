exports.Community = function(Sequelize, sequelize){
  return sequelize.define('Community', {

    community_id: { type: Sequelize.STRING, primaryKey: true},
    name: Sequelize.STRING ,
    description: Sequelize.STRING,
    photo_url: Sequelize.STRING
    
  },{
    tableName: 'community'
  });
}