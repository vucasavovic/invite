<template>
    <div class="box-header">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.box-header{
    position: sticky;
    padding: 1rem 2rem;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);

    display: flex;
    align-items:center;
    justify-content: space-between;
    gap: 2rem;

    overflow-y: auto;
}
</style>