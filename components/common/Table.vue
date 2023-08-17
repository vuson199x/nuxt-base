<template>
    <div v-if="tableData?.length > 0">
        <el-table v-loading="loading" :data="tableData" border style="width: 100%">
            <el-table-column v-if="isIndex" type="index" :index="indexMethod" />
            <el-table-column  
                v-for="({props, label, width}) in columns"  
                :key="props"
                :prop="props" 
                :label="label" 
                :width="width || 'auto'" 
            />
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
    isIndex: true,
    loading: false,
    total: 1000,
    pageSize: 10
})

const emit = defineEmits(["handleChange"])

const handleCurrentChange = (value: number) => {
    emit("handleChange", value)
}

const indexMethod = (index: number) => {
  return index + 1
}

</script>

<style>
    .pagination{
        float: right;
        margin-top: 20px
    }
</style>