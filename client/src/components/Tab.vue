<template>
    <div :class="['tab',{active:selected}]">
        <slot></slot>

    
            <slot name="footer"></slot>
         
        
    </div>
</template>

<script setup>
 const props = defineProps({ 
    title:String
})

import { inject,computed } from 'vue'
const selectedTab = inject('selectedTab')
const selected  = computed(()=>{
    return  selectedTab.value === props.title
})
</script>

<style lang="scss" scoped>
.tab{
    width: 100%;
    display: none;
    &.active{
        display: block;
    }
}
 
</style>