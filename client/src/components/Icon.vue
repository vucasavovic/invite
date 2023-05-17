<template>
    <div class="icon">
        <img @mouseover="showTooltipDelay(1000)" @mouseleave="hideTooltip" :src="`/icons/${icon}`" alt="Icon ">
        <div v-if="tooltipText" :class="['tooltip',{active:showTooltip}]">
            {{ tooltipText }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

 const props = defineProps({ 
    icon:{type:String,required:true},
    tooltipText:String
})

const showTooltip = ref(false);
const showTooltipTimeout = ref(null)

const showTooltipDelay = (delay )=>{
    if(showTooltip.value==false){
        showTooltipTimeout.value=setTimeout(()=>{
            showTooltip.value=true;
        },1000)
    } 
     
}

const hideTooltip = ()=>{
    showTooltip.value=false,
    clearTimeout(showTooltipTimeout.value);
}
</script>

<style lang="scss" scoped>
.icon{
    position: relative;
    height: 18px;
    width: fit-content;
    >img{
       height: 100%;
        display: block;
       
    }

    >.tooltip{
        position: absolute;
        z-index: 2;
        padding: 1rem;
        width: 240px;
        
      
        background-color: rgb(196, 205, 217);

        top: 100%;
        left: 50%;
        transform: translateX(-100%);
        display: none;

        &.active{
            display: block;
        }
    }
}
</style>