<template>
    <div>
        <h1>USERS</h1>
        <el-input
            v-model="params.name"
            class="search-input"
            placeholder="Name...."
            :suffix-icon="Search"
            @change="onSearch"
        />
        <CommonTable 
            :tableData="tableData" 
            :columns="columns"
            :total="paging.total"
            :pageSize="paging.page_size"
            @handle-change="handleChange"
            :loading="loading"
        />
    </div>
</template>

<script setup>
import userService from "~/services/user"
import { Search } from '@element-plus/icons-vue'
    let loading = ref(false)
    const params = ref({
        name: '',
        page: 1,
        limit: 10
    })
    const paging = toReactive({
        current_page: 1,
		total: 1,
		page_size: 10,
    })
    const tableData = ref([])

    const handleChange = (value) => {
        params.value = {
            ...params.value,
            page: value
        }
    }

    const getList = async () => {
        try {
            loading.value = true
            const {data} = await userService.getUsers(params.value);
            tableData.value = data.data
            paging.current_page =  data?.current_page
            paging.total =  data?.total
            paging.page_size =  data?.per_page
        } catch (error) {
            console.log('error', error)
        } finally{
            loading.value = false
        }
    }

    const onSearch = () => {
        getList()
    }

    watch(params, () => {
        getList()
    })
    
    onMounted(() => {
        getList()
    });

    const columns = [
        {
            label: 'Name',
            props: 'name'
        },
        {
            label: 'Email',
            props: 'email',
        },
        {
            label: 'Phone number',
            props: 'phone_number'
        },
        {
            label: 'Authority',
            props: 'authority'
        }
    ]
</script>

<style>
    .search-input{
        margin-bottom: 10px;
        width: 300px;
    }
</style>