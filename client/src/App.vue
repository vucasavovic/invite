 

<template>
  <TheAlertPopup />
  <TheHeader/>
  <main>
    <RouterView />
  </main>
  
  <div class="footer">
        2023 All rights reserved | Vuk Savovic
    </div>
</template>

<script setup>
import TheAlertPopup from './components/TheAlertPopup.vue';
import TheHeader from './components/TheHeader.vue';
import { RouterLink, RouterView } from 'vue-router'
 
</script>

<style lang="scss" scoped>
 main{
  padding : 6vh 0;
  flex: 1;
 
 }

  
</style>
