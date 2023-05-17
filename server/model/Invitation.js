

const { DataTypes } = require('sequelize');
const sequelize = require('./db');
 
const Invitation = sequelize.define('Invitation',{
    userId:{
        type:DataTypes.INTEGER
    },
    eventName:{
        type:DataTypes.STRING
    },
    templateId:{
        type:DataTypes.INTEGER
    },
    publicationDate:{
        type:DataTypes.STRING
    },
    intro:{
    type:DataTypes.STRING
    },
    brideName:{
        type:DataTypes.STRING
    },
    groomName:{
        type:DataTypes.STRING
    },
    mainParagraph:{
        type:DataTypes.TEXT
    },
    date:{
        type:DataTypes.STRING
    },
    time:{
        type:DataTypes.STRING
    },
    place:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    },
    lastLine:{
        type:DataTypes.STRING
    },
    publicUrl:{
        type:DataTypes.STRING,
        
    }
})

Invitation.sync({ alter: true })

module.exports = Invitation