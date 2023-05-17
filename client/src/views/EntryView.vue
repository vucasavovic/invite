<template>
    <div class="entry-view">
         <div class="entry-form">
            <h1 class="title">{{ mode }}</h1>
            
            <p :class="['feedback',feedbackStyle]">{{ feedback }}</p>
            
            <div class="form">
                <TextInput v-if="mode=='register'" label="username" v-model="formData.username"/>
                <TextInput label="email" v-model="formData.email"/>
                <TextInput label="password" v-model="formData.password"/>
                <TextInput v-if="mode=='register'" label="confirmation" v-model="formData.confirmation"/>
                <AppButton @click="submitForm" :text="mode"/> 
            </div>

            <div v-if="mode=='login'" class="question">
                <span> Don't have an account? </span>  
                <AppTextButton text="register" @click="router.push('/entry/register')"/>
            </div>
            <div v-if="mode=='register'" class="question">
                <span> Already have an account? </span>  
                <AppTextButton text="login" @click="router.push('/entry/login')"/>
            </div>
         </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/apiCalls.js'

import TextInput from '../components/TextInput.vue';
import AppButton from '../components/AppButton.vue';
import AppTextButton from '../components/AppTextButton.vue';
import { useMainStore } from '../stores/main';
import { useAlertPopupStore } from '../stores/alertPopupStore';

const alertPopupStore = useAlertPopupStore();

const router = useRouter();
const route  = useRoute();
const mode = ref("login");

const formData = ref({
    username:'vuca',
    email:'vucasavovic@gmail.com',
    password:'12345',
    confirmation:''
})
const mainStore = useMainStore();
mode.value = route.params.mode;
watch(
  () => route.params.mode,
  (newId, oldId) => {
    mode.value = newId
  }
)

const feedbackStyle = ref(false);
const feedback = ref('No error');

const submitForm = async ()=>{
    let resp = null;
    if(mode.value=='login'){
        login();
    }else{
        register();
    }
 
}
 
const login = async()=>{
    const resp = await api.login(formData.value);
    if(resp.status.error){
        alertPopupStore.displayAlert(resp.status.msg,'warning')
    }else{
        mainStore.user = resp.data;
        mainStore.userLogged = true;
        router.push('/dash')
        alertPopupStore.displayAlert(`Welcome, ${mainStore.user.username}`,'success')
    }
}

const register = async ()=>{
    const resp = await api.register(formData.value)
    if(resp.status.error){
        //showFeedback(true,resp.status.msg)
        alertPopupStore.displayAlert(resp.status.msg,'warning')
    }else{
        router.push('/entry/login')
        alertPopupStore.displayAlert("Well done, now login to access your account!",'comment')
        Object.keys(formData.value).forEach(function(key){ formData.value[key] = "" });
    }
}

const showFeedback = (isError,msg)=>{
    feedback.value = msg;
    if(isError){
        feedbackStyle.value = 'error';
    }else{
        feedbackStyle.value = 'success';
    }
    setTimeout(()=>{
        feedbackStyle.value=''
        feedback.value='No error'
    },3000)
}
 
  
</script>

<style lang="scss" scoped>
.entry-view{
    min-height: 100%;
    display: flex;
   
    justify-content: center;
    & .title{
        text-transform: capitalize;
        font-size: 2rem;
    }
}
.entry-form{
    max-width: 600px;
    width: 100%;
    padding: 2rem;
    border: $border;
    border-radius: $r-medium;
     
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    >:last-child{
        margin-top: 1rem;
    }
}
.question{
    display: flex;
    gap: 0.5rem;
}

.feedback{
 opacity: 0;
 pointer-events: none;
  
 &.error{
    opacity: 1;
    color: $warning;
 }
 &.success{
    opacity: 1;
    color: $success;
 }
 
}
</style>