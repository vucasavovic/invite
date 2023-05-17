<template>
  <div class="home">
      <Box class="welcome">
          <p class="date">{{ currentDate }}</p>
          <h2 class="title">Hi, {{ mainStore.user.username }}</h2>
          <AppButton @click="startNewInvitation()" text="Create an invitation"/> 
      </Box>
      <Box class="invitations">
            <BoxHeader>
              <p>Invitations</p>
              <div class="filter">
                <Icon icon="clock.svg" /> 
                <Icon icon="az.svg" /> 
              </div>
            </BoxHeader>
            <div class="invitations-list">
                <div class="titles">
                  <p>#</p>
                  <p>Name</p>           
                  <p></p>
                </div>
                <div class="rows">
                    <div v-for="(inv,index) in mainStore.myInvitations" class="invitation-tab">
                      <p>{{ index+1 }}</p>
                      <p class="title">{{ inv.eventName }}</p>  
                        <p v-if="inv.active">Active</p>
                         <InvitationTabOptions :inv="inv"/>
                    </div>
                </div>
            </div>
    </Box>
  </div>
</template>

<script setup>
import {deleteInvitationById,getInvitations} from "../api/apiCalls";
import {} from "../composables/date"
import apiCalls from "../api/apiCalls";
import { useHumanDate } from "@/composables/date.js"
import Box from '../components/Box.vue';
import BoxHeader from '@/components/BoxHeader.vue'
import Icon from '../components/Icon.vue';
import AppButton from '../components/AppButton.vue';
import AppTextButton from "../components/AppTextButton.vue";
import {ref,computed, onMounted} from "vue"
import { useRouter } from "vue-router"
import { useMainStore } from '../stores/main';
import InvitationTabOptions from "../components/InvitationTabOptions.vue";
const router = useRouter();
const mainStore = useMainStore();

const isPublic = function(){
  return 
}
onMounted( async()=>{
   const invitations = await  getInvitations();
   mainStore.setInvitations(invitations);
})
const filteredInvitations = computed(()=>{
   return invitations.value;
})

 
const startNewInvitation = function(){
   mainStore.resetCurrentInvitation();
   router.push('/invitation');
}

 
const currentDate = computed(()=>{
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const date = new Date();
   let day = days[date.getDay()];
   let dayNum = date.getDate();
   let currentMonth =month[date.getMonth()];
  return `${day}, ${currentMonth} ${dayNum}th`
})
</script>

<style lang="scss" scoped>
 .home{
  display: flex;
  flex-direction: column;
  gap: 1rem;
 }
 .welcome{
  width: 100%;
  max-width: 460px;
  height: fit-content;
  padding: 2rem;
  display: flex;
  flex-direction: column;

   >.title{
    font-size: 2.4rem;
    text-transform: capitalize;
   }
   >.date{
    margin-bottom: 0.3rem;
    font-size: 1.125rem;
   }
   >:last-child{
    margin-top: 4rem;
    margin-top: auto;
   }
 }

 .invitations{
  flex: 1;
 }

 .filter{
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
 }

 .invitations-list{
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  & .titles,.invitation-tab{
    display: grid;
    grid-template-columns:40px 1fr 24px;
    gap: 1rem;
     
  }
  & .titles{
    padding: 1rem 0;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
    font-weight: 500;
    opacity: 0.5;
    >:last-child{
      text-align: end;
    }
  }
 }

 .rows{
  min-height: 300px;
 }

 .invitation-tab{
  position: relative;
  cursor: pointer;
  padding: 1rem 0;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
  background-color: transparent;
  background: transparent;
  transition: all .2s ease-in-out;
  >*{
    white-space: nowrap;
  }

  >:last-child{
     margin-left: auto;
    }

  >.title{
    font-weight: 600;
 
  }

  &:hover{
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(209,210,219,0.5) 49%, rgba(255,255,255,0) 100%);
  }
 }

 .options{
  display: flex;
  gap: 1rem;
  align-items: center;
 }
</style>
