const sequelize = require('./db');
const { DataTypes } = require('sequelize');
 
const User  = sequelize.define('User',{
    username:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    passwordHash:{
        type:DataTypes.STRING,
        allowNull: false
    } 
})


User.sync({force:false})

module.exports = User;