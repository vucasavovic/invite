<template>
    <div :class="['thumbnail',{active:isSelected}]">
        <img :src="invitationTemplate.thumbnailUrl" alt="Invitation thumbnail">

        <div class="about">
            <p>{{ invitationTemplate.name }}</p>
            <img src="/icons/selected.svg" alt="" class="selected">
        </div>  
    </div>
</template>

<script setup>
import {computed} from "vue";
import { useMainStore } from '../stores/main';

 const props = defineProps({ 
    invitationTemplate:Object,
    
})

const mainStore = useMainStore();
const isSelected = computed(()=>{
    if(mainStore.currentInvitation.templateId){
     return props.invitationTemplate.id == mainStore.currentInvitation.templateId
    }
    return false;
})
 
</script>

<style lang="scss" scoped>
.thumbnail{
    cursor: pointer;
    >img{
        width: 100%;
    }

    &.active{
 
       & .selected{
        display: block;
       }

        
    }
}

.selected{
    display: none;
}

.about{
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: rgba($color: #000000, $alpha: .4);
    display: flex;
    justify-content: space-between;
}
</style>