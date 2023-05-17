<template>
    <button class="button" :type="type">
        {{ text }}
    </button>
</template>

<script setup>
 const props = defineProps({ 
    text:String,
    type:{type:String,default:'button'}
})
</script>
 