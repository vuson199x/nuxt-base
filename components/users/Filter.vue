<template>
    <CommonFilter @onCreate="emit('onOpenDialog')">
        <el-input
            v-model="params.name"
            class="search-input"
            placeholder="Name...."
            :suffix-icon="Search"
            @change="emit('onSearch')"
        />
    </CommonFilter>

</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

defineProps<{
    params: {
        name: string
        page: number
        limit: number
    };
}>();

const emit = defineEmits(["onSearch", "onOpenDialog"])

</script>

<style>

</style>