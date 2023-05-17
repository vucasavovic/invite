<template>
  <div class="invitation-view">
      <Box class="form">
        <BoxHeader>
          <div class="tab-navigation"> 
            <template v-for="(tab,index) in tabTitles" :key="index">
              <AppTextButton  :text="tab"  @click="tabWrapper.select(tabTitles[index])"/>
              <span v-if="index<tabTitles.length-1"></span>
            </template>
             
          </div> 
         </BoxHeader>
         <form @submit.prevent="submitFormHandler()"> 
         <TabWrapper @tabSelected="(t)=>selectedTab=t" ref="tabWrapper"> 
              
              <InvitationEditorTab :title="tabTitles[0]">  
              <TextInput label="Event name" v-model="mainStore.currentInvitation.eventName"/>
              <DropdownInput :options="['Wedding']" /> 
                <template v-slot:footer>
                  <AppTextButton class="right-btn"  text="Next" @click="tabWrapper.select(tabTitles[1])"/>
                </template>
            </InvitationEditorTab>   

            <InvitationEditorTab :title="tabTitles[1]">  
                <div class="templates">
                  <div class="slider">
                    <Thumbnail @click="mainStore.currentInvitation.templateId = template.id"  v-for="(template,index) in mainStore.invitationTemplates" :key="index"  :invitationTemplate="template"/> 
                  </div>
                </div>
                <template v-slot:footer>
                  <AppTextButton  text="Back" @click="tabWrapper.select(tabTitles[0])"/>
                  <AppTextButton  text="Next" @click="tabWrapper.select(tabTitles[2])"/>
                </template>
            </InvitationEditorTab>   

            <InvitationEditorTab :title="tabTitles[2]"> 
              
              <TextInput label="Intro" v-model="currentInvitation.intro"/>
              <TextInput label="Bride" v-model="currentInvitation.brideName"/>
              <TextInput label="Groom" v-model = "currentInvitation.groomName"/>
              <TextInput type="textarea" label="Text" v-model="currentInvitation.mainParagraph"/>
              <InputDate v-model="currentInvitation.date"  /> 
              <TextInput label="Time" v-model = "currentInvitation.time"/>
              <TextInput label="At" v-model="currentInvitation.place"/>
              <TextInput label="Adress" v-model="currentInvitation.address"/>
              <TextInput type="textarea" label="Final message" v-model="currentInvitation.lastLine"/>
              
              <template v-slot:footer>
                <AppTextButton  text="Back" @click="tabWrapper.select(tabTitles[1])"/>
                <AppTextButton  text="Next" @click="tabWrapper.select(tabTitles[3])"/>
              </template>
            </InvitationEditorTab>
            
            <InvitationEditorTab :title="tabTitles[3]"> 
              <InputDate  label="Publication date"  v-model="mainStore.currentInvitation.publicationDate" />
              <template v-slot:footer>
                <AppTextButton  text="Back" @click="tabWrapper.select(tabTitles[2])"/>
              </template>
              <AppButton type="submit" text="Save" /> 
            </InvitationEditorTab>
          </TabWrapper>
        </form>

      </Box>
      <Box class="invitation-preview-box">
        <BoxHeader>
           Preview
         </BoxHeader>
         <InvitationContainer/>
      </Box>
  </div>
</template>

<script setup>
 
import {ref,computed,watch} from "vue"
import { storeToRefs } from "pinia";
import {saveInvitation,getInvitations} from "@/api/apiCalls"
import Box from '../components/Box.vue';
import BoxHeader from '@/components/BoxHeader.vue'
import AppButton from '../components/AppButton.vue';
import AppTextButton from '../components/AppTextButton.vue';
import TabWrapper from '../components/TabWrapper.vue';
import InputDate from '../components/InputDate.vue';
import InvitationEditorTab from '../components/InvitationEditorTab.vue';
import TextInput from '@/components/TextInput.vue'
import DropdownInput from '@/components/DropdownInput.vue'
import Thumbnail from '../components/Thumbnail.vue';
import InvitationContainer from '../components/InvitationContainer.vue';

import { useMainStore } from '../stores/main';
import { useAlertPopupStore } from '../stores/alertPopupStore';
import { useRouter } from "vue-router";
 
const router = useRouter();
 
const alertPopupStore = useAlertPopupStore()
const mainStore = useMainStore();
const { currentInvitation } = storeToRefs(mainStore);
 
 
const tabWrapper = ref(null);
const tabTitles = ref(['Event','Template','Content','Final'])

const  selectedTab =  ref();
const isSelected = function(tabTitle){
  return selectedTab.value==tabTitle
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
 
const submitFormHandler = async function(){
    const result = await mainStore.vuelidator.$validate();
    if(!result){
      const errors = mainStore.vuelidator.$errors
      console.log(errors);
      alertPopupStore.displayAlert("Incorrectly filled form!",'warning')
      return;
    }
    console.log(result,' form validation');
    const saved = await saveInvitation(currentInvitation.value);
    const invitations = await  getInvitations();
    mainStore.setInvitations(invitations);
    router.push('/dash')
    alertPopupStore.displayAlert('Invitation saved successfully!','success')
} 

</script>

<style lang="scss" scoped>
 .invitation-view{
  display: flex;
  gap: 1rem;

  @include breakpoint-down(1200px){
    flex-direction: column-reverse;
  }
 }
 .form{
  flex: 1;
  max-width: 600px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  @include breakpoint-down(1200px){
   max-width:none;
  }
 }

 .invitation-preview-box{
  flex: 1;
  height: max-content;
  overflow: hidden;
 }

 
 .tab-navigation{
 
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  color: rgba($color: #000000, $alpha: 0.4);

  &.bottom{
    padding-top: 4rem;
  }
  
  >span{
    width: 4px;
    height: 4px;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
 }
  
 .templates{
  width: 100%;
  overflow: hidden;
  position: relative;
   
  >.slider{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2rem;
  }
 }

 .right-btn{
  margin-left: auto;
 }
</style>
