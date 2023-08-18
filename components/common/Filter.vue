<template>
  <div class="filter">
    <slot />
    <el-button v-if="isShowCreate" type="primary" @click="emit('onCreate')">Create</el-button>
  </div>
</template>

<script setup lang="ts">
interface FilterProps {
  isShowCreate: boolean
}

withDefaults(defineProps<FilterProps>(), {
    isShowCreate: true,
})

const emit = defineEmits(["onCreate"])
</script>

<style scoped>
    .filter{
        display: flex;
        gap: 10px;
    }
</style>