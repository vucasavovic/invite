

module.exports = class ApiResponse {
    
    status = {error:false,msg:'success'}
    data = {}

    constructor(error,msg,data=null){
        this.status.error = error
        this.status.msg = msg
        this.data = data
    }

    static error(msg,data){
        return new ApiResponse(true, msg, data)
    }

    static success(msg,data=null){
        return new ApiResponse(false,msg,data)
    }
 
}