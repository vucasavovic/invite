const ApiResponse = require('./ApiResponse');

const onError = (err,req,res,next)=>{

    if(err instanceof ApiResponse){
        res.send(err)
    }else{
        res.send(ApiResponse.error("Server error,try again!"));
    }
     
}


module.exports={
    onError
}