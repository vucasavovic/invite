<template>
    <div class="box-footer">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.box-footer{
    padding: 1rem 2rem;
    border-top: 1px solid rgba($color: #000000, $alpha: 0.2);

    display: flex;
    align-items:center;
    justify-content: space-between;
    gap: 2rem;
}
</style>