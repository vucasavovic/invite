<template>
    <div class="dropdown-menu">
        <slot></slot>
        <div :class="['options',{active:displayOptions}]">
            <slot name="options"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

 
const displayOptions = ref(false)


const display = function(isDisplayed){
    displayOptions.value = isDisplayed;
}

defineExpose({display})

</script>

<style lang="scss" scoped>
.dropdown-menu{
   position: relative;
}

.options{
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);


    background-color: white;
    padding: 1rem;

    display: none;
    flex-direction: column;
    gap: 0.8rem;

    box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.1);


    &.active{
        display: flex;
    }
}
</style>