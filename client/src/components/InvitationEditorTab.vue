<template>
   <Tab :title="title">
    <div class="form">
        <slot></slot>
    </div>
          
    <div class="footer">
        <slot name="footer"></slot>
    </div>
   </Tab>
</template>

<script setup>
import Tab from './Tab.vue';
 const props = defineProps({ 
    title:String
})
</script>

<style lang="scss" scoped>
.footer{
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

 
</style>