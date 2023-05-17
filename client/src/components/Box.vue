<template>
    <div class="box">
     
        <slot></slot>
      
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.box{
    border: 1px solid rgba($color: #000000, $alpha: 0.2);
    border-radius: 18px;
    min-height: 200px;
}
</style>