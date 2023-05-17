import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref,reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '../api/apiCalls.js'
 
import { useRouter } from 'vue-router';
import { toMysqlDate } from '../composables/date.js';

export const useMainStore = defineStore('main', () => {
 
  const userLogged = ref(false);
  const user = ref({
    id:32,
    username:'John'
  })

  const myInvitations = ref([]);
  const invitationTemplates = ref([
    {id:1,type:'wedding',name:'Lara',thumbnailUrl:'/invitationThumbnails/wedding-invitation-1.jpg'},
    {id:2,type:'wedding',name:'Joly',thumbnailUrl:'/invitationThumbnails/wedding-invitation-2.jpg'},
    
]);
  
 
  const currentInvitation = ref({
    id:null,
    eventName:'',
    templateId: '1',
    publicationDate:{},
    date: {},
    intro: '',
    brideName: '',
    groomName: '',
    mainParagraph: 'y',
    time:'',
    place:'',
    address: '',
    lastLine : ''
  });
  
  
  const getInvitation = function(id){
    return myInvitations.value.filter(i=>i.id==id)[0];
  };
 
  const setInvitations = (invitations)=>{
    myInvitations.value = invitations;
  }

  const selectInvitation = function(id){
    const targetInvitation = myInvitations.value.filter(i=>i.id==id)[0];
    if(targetInvitation){
      currentInvitation.value = targetInvitation;
      return true;
    }else{
      alert('Nothing to select')
      return false;
    }
  }

  const resetCurrentInvitation = function(){
      currentInvitation.value = {
        id:null,
        eventName:'',
        templateId: '1',
        publicationDate:{},
        date: {},
        intro: '',
        brideName: '',
        groomName: '',
        mainParagraph: '',
        time:'',
        place:'',
        address: '',
        lastLine : ''
      }
     
  }

  const rules =  {
    id:{},
    eventName:{required},
    templateId: {},
    publicationDate:{},
    date: {},
    intro: {},
    brideName: {},
    groomName: {},
    mainParagraph: {},
    time:{},
    place:{},
    address: {},
    lastLine : {}
  }

  const vuelidator = useVuelidate(rules,currentInvitation.value);
 
  return { 
    vuelidator,
    user, 
    userLogged, 
    currentInvitation, 
    myInvitations,
    setInvitations,
    invitationTemplates,
    getInvitation,
    selectInvitation,
    resetCurrentInvitation
  }
})
