<template>
    <CommonFilter @onCreate="emit('onOpenDialog')">
        <el-input
            v-model="params.search_key"
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
        search_key: string
        page: number
        limit: number
    };
}>();

const emit = defineEmits(["onSearch", "onOpenDialog"])

</script>

<style scoped>
    .search-input{
        margin-bottom: 10px;
        width: 300px;
    }
</style>