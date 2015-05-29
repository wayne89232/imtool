exports.Example = function(Sequelize, sequelize){
  return sequelize.define('Example', {
    player_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    player_name: Sequelize.STRING ,
    team_id: Sequelize.INTEGER,
    position: {
    	type:   Sequelize.ENUM,
    	values: ['P', 'C', "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"]
    },
    age: Sequelize.INTEGER,
    height: Sequelize.INTEGER,
    weight: Sequelize.INTEGER,
    batting: {
    	type:   Sequelize.ENUM,
    	values: ['L', 'R']
    }
  },{
    tableName: 'example'
  });
}