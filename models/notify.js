exports.Notify = function(Sequelize, sequelize){
  return sequelize.define('Notify', {

    notify_id: { type: Sequelize.STRING, primaryKey: true}, 
    user_id: Sequelize.STRING,
    mission_id: Sequelize.STRING,
    optional_content: Sequelize.STRING,
    type: {
    	type:   Sequelize.ENUM,
    	values: ['Fired', 'Hired', 'Rated']
    }
  },{
    tableName: 'notify'
  });
}