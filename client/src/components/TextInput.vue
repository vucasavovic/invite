<template>
    <div class="input">
        <label>{{label}}</label>
        <div class="wrapper">
        <input v-if="type=='text'" type="text" :value="modelValue" @input="updateValue" @keypress.enter.prevent>
        <textarea v-else :value="modelValue" @input="updateValue" @keypress.enter.prevent></textarea>
        <img @mouseenter="showInfo=true" @mouseleave="showInfo=false" v-if="info" src="/icons/info.svg" class="info-icon" alt="">

        <div v-if="info" :class="['info-box',{active:showInfo}]">
            {{ info }}
        </div>
        </div>
         
    </div>
</template>

<script setup>
import {ref} from 'vue'
 const props = defineProps({ 
    type:{type:String,default:'text'},
    label:{type:String,required:true},
    info:String,
    modelValue:[String,Number]
})
const showInfo = ref(false)
const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss">
.input{
    & input,textarea{
        width: 100%;
        padding: 1rem 0;
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
        font-size: inherit;
        font-family: inherit;
        &:focus{
         outline: none;
        }
    }
    textarea{
        resize: none;
        height: 200px;
        
    }
}

.wrapper{
    position: relative;
    display: flex;
    gap:  .2rem;
    align-items: flex-start;
}
.info-box{
    padding: 1rem;
    background-color: rgb(185, 220, 251);
    font-size: 0.8rem;
    max-width: 300px;
    width: 100%;


    position: absolute;
    z-index: 5;
    top: 1rem;
    left: 100%;
    transform: translateX(calc(-100% - 1rem));

    line-height: 1.5;

    display: none;

    &.active{
        display: block;
    }
}
.info-icon{
    cursor: pointer; 
}
</style>