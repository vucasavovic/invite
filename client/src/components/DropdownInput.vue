<template>
    <div @click="displayOptions(true)" class="dropdown">
        <label for="">Type</label>
        <div class="output">
            <p>{{ selected }}</p>
        </div>
        <datalist @mouseleave="displayOptions(false)" :class="['options',{active:optionsVisible}]">
            <option @click.stop="select(op)" class="option" v-for="(op,index) in options" :key="index">{{op}}</option>
        </datalist>
    </div>
</template>

<script setup>
import {ref } from 'vue';
 const props = defineProps({ 
    options:Array
})
const optionsVisible = ref(false);
const selected = ref(props.options[0]);

 
const displayOptions = function(visible){
    optionsVisible.value = visible
}

const select = function(val){
    selected.value = val
    displayOptions(false)
}
</script>

<style lang="scss" scoped>
.dropdown{
    position: relative;
    >label{
      font-size: 1rem;
      font-weight: 600;
    }
}
.output{
    cursor: pointer;
    padding: 1rem 0;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
}
.options{
    display: none;
    position: absolute;
    z-index: 2;
    top: 100%;
    background-color: white;
 
    border: 1px solid black;
    flex-direction: column;
    
    max-width: 400px;
    width: 100%;

    >*{
        cursor: pointer;
        padding: 0.5rem 1rem;

        &:hover{
            background-color: beige;
        }
    }

    &.active{
        display: flex;
    }
}
</style>