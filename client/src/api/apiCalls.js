import Http from "./http"

const http = new Http();

export default {
 
    async login(formData){
        delete formData.username; 
        delete formData.confirmation; 
        const response = await http.post('/api/user/login',formData)
        return response ;           
    },

    async logout (){
        const response = await http.post('/api/user/logout')
        if(response.status.error){
              console.log('Failed to logout: ', response.status.msg)
        }else{
            return true;  
        }
    },

    async register(formData){
        const data = await http.post('/api/user/register',formData)
        return data;  
    }
}


export const deleteInvitationById = async function(invitationId){
  
        const result = await http.post('/api/invitation/delete',{invitationId:invitationId})
        if(result){
            if(!result.status.error){
                return true;
            } 
        }
        return false;    
}

export const getInvitations = async function(){
    const response = await http.get('/api/invitation/all')
    if(response.status.error){
        return []
    }else{
        return response.data;
    } 
}

export const saveInvitation =async function(invitation){
    const response = await http.post('/api/invitation/save',invitation);
    if(!response.status.error){
       return response.data
    }else{
       alert(response.status.msg)
    }
}   
 
 
     
 
 