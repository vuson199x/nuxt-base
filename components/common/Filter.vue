<template>
  <div class="filter">
    <slot />
    <el-button type="primary" @click="emit('onCreate')">Create</el-button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["onCreate"])
</script>

<style>
    .filter{
        display: flex;
        gap: 10px;
    }
</style>