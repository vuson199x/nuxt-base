<template>
    <div v-if="tableData?.length > 0">
        <el-table v-loading="loading" :data="tableData" border style="width: 100%">
            <el-table-column  
                v-for="({props, label, width}) in columns"  
                :key="props"
                :prop="props" 
                :label="label" 
                :width="width || 'auto'" 
            />
            <slot />
        </el-table>
        <el-pagination 
            class="pagination"
            background  
            layout="prev, pager, next" 
            :total="total" 
            :page-size="pageSize"
            :pager-count="5"
            @current-change="handleCurrentChange"
        />
    </div>
    <el-empty v-else description="No Data" />
</template>

<script setup lang="ts">
import {TableProps} from '~/types/table'

const props = withDefaults(defineProps<TableProps>(), {
    tableData: [],
    columns: null,
    loading: false,
    total: 1000,
    pageSize: 10
})

const emit = defineEmits(["handleChange"])

const handleCurrentChange = (value: number) => {
    emit("handleChange", value)
}

</script>

<style scoped>
    .pagination{
        float: right;
        margin-top: 20px
    }
</style>