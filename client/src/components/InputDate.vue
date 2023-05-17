<template>
    <div class="input">
            <label for="">{{ typeof label != "undefined" ? label : 'Date' }}</label>

           <div class="inputs"> 
            <input maxlength="2" type="text" placeholder="DD" :value="dateObj.day" @input="dateObj.day=$event.target.value"> 
            <input maxlength="2" type="text" placeholder="MM" :value="dateObj.month" @input="dateObj.month=$event.target.value"> 
            <input maxlength="4" type="text" placeholder="YYYY" :value="dateObj.year" @input="dateObj.year=$event.target.value"> 
        </div>
    </div>
</template>

<script setup>
import TextInput from './TextInput.vue';
import {ref,defineEmits, watch, reactive} from 'vue'
import { toMysqlDate } from '../composables/date';
const emit = defineEmits(['update:modelValue'])

const props = defineProps({ 
    label:String,
    modelValue:Object
})
 
const dateObj = ref({
    day:'',
    month:'',
    year:''
})
 
watch( dateObj.value,()=>{
     emit('update:modelValue', dateObj.value)
})
 
 
</script>

<style lang="scss" scoped>
.inputs{
    display: flex;
   
}
</style>