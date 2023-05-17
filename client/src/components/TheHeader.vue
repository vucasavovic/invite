<template>
    <div class="header">
        <div class="brand">
            <img src="/logo.svg" alt="">
        </div>
        <nav v-if="mainStore.userLogged">
            <RouterLink to="/dash">Home</RouterLink>
            <RouterLink to="/invitation">Invitation</RouterLink>
        </nav>
       
        <div class="logs flex">
            <AppTextButton v-if="mainStore.userLogged"  text="Logout"  @click="logout"/>
            <AppTextButton v-if="!mainStore.userLogged" class="login" text="Login" @click="router.push('/entry/login')"/>
        </div>

        <div v-if="mainStore.userLogged" class="burger">
            <Icon @click="showMenu=!showMenu" class="" icon="burger.svg"/>
            <div :class="['menu',{active:showMenu}]">
                <RouterLink @click.stop="showMenu=false" to="/dash">Home</RouterLink>
                <RouterLink @click.stop="showMenu=false" to="/invitation">Invitation</RouterLink>
            </div>
        </div>
         

    </div>
</template>

<script setup>
import Icon from './Icon.vue';
import apiCalls from '../api/apiCalls';
import AppTextButton from './AppTextButton.vue';
import { useMainStore } from '../stores/main';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const mainStore = useMainStore();
const router = useRouter();

const logout = async()=>{
    if( await apiCalls.logout()){
        mainStore.user={}
        mainStore.userLogged = false
        router.push('/entry/login')
    }
}

 const showMenu = ref(false)
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    align-items: center;
    gap: 0.4rem;
}
.header{
    position: sticky;
    z-index: 100;

    top: 0;
    width: inherit;
    max-width: inherit;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    
    background-color: white;
    border-bottom: 1px solid rgba($color: #000000, $alpha: .2);
    
}

.header>nav{
    display: flex;
    gap: 2rem;
    margin-right: auto;
    margin-left: 4rem;


    @include  breakpoint-down(760px){
        display: none;
    }
}
.logs{
    margin-left: auto;
}
.account{
    align-items: center;
    display: flex;
    gap: 0.6rem;

    &-thumbnail{
 
        border-radius: 100px;
        height: fit-content;
        >img{
            display: block;
        }
    }
}

.burger{
    position: relative;
    display: none;
    @include breakpoint-down(760px){
        display: block;
    }

    >.menu{
        position: absolute;
        z-index: 2;
        top: 100%;
        left: 100%;
        transform: translate(-100%,1rem);
        display: none;

        padding: 2rem;
        background-color: white;

        flex-direction: column;
        gap: 1rem;
        &.active{
            display: flex;
        }
    }
}
</style>