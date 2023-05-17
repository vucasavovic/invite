<template>
    <AppDropdownMenu ref="dropdown">   
        <Icon @click="dropdown.display(true)" icon="burger.svg"/>

        <template   v-slot:options>
            <AppTextButton @click="copyPublicUrl(inv.publicUrl)" icon="url-copy.svg" text="Copy link"/>
            <AppTextButton @click="openPublicInvitation(inv.publicUrl)" icon="globe.svg" text="See public"/>
            <AppTextButton @click="selectForEditing(inv.id)" icon="edit.svg" text="Edit"/>
            <AppTextButton @click="deleteInvitation(inv)"  text="Delete"/>
        </template>
    </AppDropdownMenu>
</template>

<script setup>
import AppDropdownMenu from "./AppDropdownMenu.vue";
import {deleteInvitationById,getInvitations} from "../api/apiCalls";
import { useRouter } from 'vue-router';
import AppTextButton from './AppTextButton.vue';
import Icon from './Icon.vue';
import { useMainStore } from "../stores/main";
import { ref } from "vue";
import { useAlertPopupStore } from "../stores/alertPopupStore";
import { storeToRefs } from "pinia";

const alertPopupStore = useAlertPopupStore();
 

 const props = defineProps({ 
    inv:Object
})
const mainStore = useMainStore();
const router = useRouter();

const dropdown = ref(null)

////Should these methods be out of the component? Decoupled??
const deleteInvitation = async function(invitation){
  const deleted = await deleteInvitationById(invitation.id);
  if(deleted){
    const invitations = await getInvitations();
    mainStore.setInvitations(invitations);
    alertPopupStore.displayAlert("Invitation deleted succesfully!",'success')
  }else{
    alertPopupStore.displayAlert("Invitation not deleted!",'warning')
  }
}

const selectForEditing = function(id){
 const selected =  mainStore.selectInvitation(id);
 if(selected) router.push('/invitation')
 dropdown.value.display(false)
}
const copyPublicUrl = async function(publicUrl){
  await navigator.clipboard.writeText(publicUrl);
  dropdown.value.display(false)
}
const openPublicInvitation = function(publicUrl){
  window.open(publicUrl, '_blank');
  dropdown.value.display(false)
}
</script>

<style lang="scss" scoped>
.tab-options{
   position: relative;
}

.options{
    position: absolute;
    top: 110%;
    left: 100%;
    transform: translateX(-80%);

    background-color: white;
    padding: 1rem;

    display: none;
    flex-direction: column;
    gap: 0.8rem;

    box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.1);


    &.active{
        display: flex;
    }
}
</style>