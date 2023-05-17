<template>
    <div class="text-button">
        <Icon v-if="icon" :icon="icon"/> 
        <p> {{ text }}</p> 
    </div>
</template>

<script setup>
import Icon from './Icon.vue';
 const props = defineProps({ 
    text:{type:String,required:true},
    icon:String
})
</script>

<style lang="scss" scoped>
.text-button{
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    text-transform: capitalize;
    color: rgba($color: #000000, $alpha: 0.4);
   
    transition: all .1s ease-in-out;
    display: flex;
    align-items: center;
    gap: .4rem;
    &:hover{
        color: rgba($color: $black, $alpha: 1);
    }
}
</style>