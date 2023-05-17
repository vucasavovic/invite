<template>
    <div class="tab-wrapper">
            <slot></slot>
    </div>
</template>

<script setup>
    import { ref , onMounted} from "vue"
    import { useSlots,provide  } from 'vue'
    const slots = useSlots()

    const emit = defineEmits(['tabSelected']);
    const selectedTab = ref(null);
    const tabs = ref(slots.default());
    onMounted(()=>{
        select(tabs.value[0].props.title)
    })
    provide('selectedTab', selectedTab)
 
    const select = function(tabTitle){
        selectedTab.value = tabTitle;
        emit('tabSelected',selectedTab.value)
    }
 
    defineExpose({select,selectedTab})

</script>

<style lang="scss" scoped>
.tab-wrapper{
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
   
}
</style>