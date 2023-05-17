import { defineStore } from 'pinia'
import { ref,reactive, computed } from 'vue'


export const useAlertPopupStore = defineStore('popupStore', () => {

    const message = ref('Default mesage text.')
    const theme = ref('comment')
    const active = ref(false)

    let timeout = null;

    const displayAlert = function(messageText, themeName, durationSeconds=3){
            message.value = messageText;
            theme.value = themeName;
            active.value=true;

            if(timeout){
                clearTimeout(timeout);
            }
            timeout = setTimeout(()=>{
                active.value=false;
            },durationSeconds*1000)
    }

    return{
        active,
        theme,
        message,
        displayAlert
    }
})