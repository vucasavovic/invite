<template>
    <div class="invitation-container">
       <WeddingInvitation1 v-if="mainStore.currentInvitation.templateId==1" :invitation="mainStore.currentInvitation"/>
       <WeddingInvitation2 v-if="mainStore.currentInvitation.templateId==2" :invitation="mainStore.currentInvitation"/>
    </div>
</template>

<script setup>
import {ref,watch,onMounted} from "vue";
import {storeToRefs} from "pinia"
import { useMainStore } from '../stores/main';
import WeddingInvitation1 from './Invitations/WeddingInvitation-1.vue';
import WeddingInvitation2 from './Invitations/WeddingInvitation-2.vue';
 
 const mainStore  = useMainStore();
 
 
</script>

<style lang="scss" scoped>
.invitation-container{
  padding: 1rem;
  background-color: rgb(255, 255, 255);

  @include breakpoint-down(1200px){
   padding: 0;
  }
}
</style>