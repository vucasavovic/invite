const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { json } = require('sequelize');
const ApiResponse = require('../error/ApiResponse');
const User = require('../model/User');


const logout = async(req,res,next)=>{
    res.clearCookie("meToken");
    res.send(ApiResponse.success('Cookie deleted!'))
}
 
const login = async (req,res,next)=>{
    const {email,password} = req.body  
    try {
        const user = await User.findOne({where:{email:email}});
        if(user==null){
          return next(ApiResponse.error('Unknown user!'))
        } 

        const correctPassword = await bcrypt.compare(password,user.passwordHash);
        if(!correctPassword){
          next(ApiResponse.error("Incorrect password"))
        }else{
           const token = jwt.sign({id:user.id}, 'shhhhh1234')
           
           res.cookie("meToken", JSON.stringify(token), {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
          });
            
           res.send(ApiResponse.success('Successfully logged.', {id:user.id,username:user.username} )) 
        }
        
        
         
    } catch (error) {
        
        next(ApiResponse.error(error.message))
    }
}

const register = async (req,res,next)=>{
    const {username,email,password} = req.body
    /// validation and sanatization not implemented
    try {
        const saltRounds = 9;
        const passwordHash = bcrypt.hashSync(password,saltRounds);
        const newUser = await User.create({username,email,passwordHash})
        if(newUser==null){
          return next(ApiResponse.error("User not registered!"))
        }else{
            res.send(ApiResponse.success('Registered successfully.'))
        }
 
    } catch (error) {
        if(error.errors[0].path=='email'){
         return next(ApiResponse.error("Email already in use"))
        }
        next(ApiResponse.error("Something went wrong!", error.errors))
    }
}

const authorization = async (req,res,next)=>{
    try {
        const tokenUser =  jwt.verify(JSON.parse(req.cookies.meToken),'shhhhh1234');
        const user = await User.findOne({
            where:{id:tokenUser.id}
        });
        req.user= user.dataValues;
       
        next();
    } catch (error) {
        console.log(error.message,'error!')
        next(error);
    }
    
    
}

module.exports={
    authorization,
    login,
    logout,
    register
}