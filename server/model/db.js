const  Sequelize = require('sequelize');
 
const sequelize = new Sequelize('wedding-invitation-app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName:true
    }, 
    logging: false
    
});


try {
     sequelize.authenticate().then(()=>{
        console.log('Success!')
     })
    
} catch (error) {
    console.log(error)
}

module.exports = sequelize;