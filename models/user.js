exports.User = function(Sequelize, sequelize){
  return sequelize.define('User', {
    user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    user_name: Sequelize.STRING ,
    password: Sequelize.STRING 

  },{
    tableName: 'user'
  });
}