<template>
    <div>
        <Users :count="count" @on-increase="increaseCount"/>
        <CommonTable 
            :tableData="tableData" 
            :columns="columns"
            :total="paging.total"
            :pageSize="paging.page_size"
            @handle-change="handleChange"
        />
    </div>
</template>

<script setup>
import userService from "~/services/user"

    let count = ref(1)
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

    const increaseCount = () => {
        count.value++
    }

    const handleChange = (value) => {
        params.value = {
            ...params.value,
            page: value
        }
    }

    const getList = async () => {
        const {data} = await userService.getUsers(params.value);
        tableData.value = data.data
        paging.current_page =  data?.current_page
        paging.total =  data?.total
        paging.page_size =  data?.per_page
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

</style>