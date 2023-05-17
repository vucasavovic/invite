<template>
    <div :class="['alert-popup',store.theme,{active:store.active}]">
        <div class="alert-icon">
            <Icon :icon="iconName"/>
        </div>
        <p>{{ store.message }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Icon from './Icon.vue';
import {useAlertPopupStore} from '@/stores/alertPopupStore.js'

const store = useAlertPopupStore();
 
 const iconName = computed(()=>{
    return store.theme + '.svg'
 })

</script>

<style lang="scss" scoped>
.alert-popup{
    position: fixed;
    z-index: 99;
    top: 0;
    left: 50%;
    transform: translate(-50%,-100%);
    transition: all .4s ease-in-out;
    padding: 1rem 2rem;
    
    max-width: 700px;
    width: fit-content;
    color: white;

    display: flex;
    gap: 1rem;

    border-radius: 0 0 12px 12px;

    &.comment{
        background-color: $neutral;
    }

    &.success{
        background-color: $success;
    }

    &.warning{
        background-color: $warning;
    }

    &.active{
        transform: translate(-50%,60px);
    }
}

.alert-icon{
    height: 18px;
 
}
 
</style>