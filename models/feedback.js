exports.Feedback = function(Sequelize, sequelize){
  return sequelize.define('Feedback', {

    feedback_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    content: Sequelize.STRING,
    stars: Sequelize.INTEGER
    
  },{
    tableName: 'Feedback'
  });
}