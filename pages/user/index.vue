<template>
    <div>
        <h1>USERS</h1>
        <UsersFilter 
            :params="params"
            @onSearch="getList"
            @onOpenDialog="dialogVisible = true"
        />
        <CommonTable 
            :tableData="tableData" 
            :columns="columns"
            :total="paging.total"
            :pageSize="paging.page_size"
            @handle-change="handleChange"
            :loading="loading"
        >
            <el-table-column fixed="right" label="Actions" width="80px">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="getDetail(scope.row.id)">Edit</el-button>
                </template>
            </el-table-column>
        </CommonTable>
        <UsersDialog 
            v-if="dialogVisible"
            :open="dialogVisible"
            :data="dataForm"
            @onCancel="onCloseDialog()"
            @getList="getList"
        />
    </div>
</template>

<script setup>
    import userService from "~/services/user"

    let loading = ref(false)
    let dataForm = ref(null)
    let params = ref({
        search_key: '',
        page: 1,
        limit: 10
    })
    const paging = toReactive({
        current_page: 1,
		total: 1,
		page_size: 10,
    })
    const tableData = ref([])
    let dialogVisible = ref(false)

    const handleChange = (value) => {
        params.value = {
            ...params.value,
            page: value
        }
    }

    const onCloseDialog = () => {
        dataForm.value = null
        dialogVisible.value = false
    }

    const getDetail = async (id) => {
        try {
            const {data} = await userService.getUserDetail(id);
            dataForm.value = data
            dialogVisible.value = true
        } catch (error) {
            console.log('error', error)
        }
    }

    const getList = async () => {
        try {
            loading.value = true
            const {data} = await userService.getUsers(params.value);
            const table = data.data.map((item, index) => {
                return {
                    ...item,
                    index: index + data.per_page * (data.current_page - 1) + 1,
                }
            })
            tableData.value = table
            paging.current_page =  data?.current_page
            paging.total =  data?.total
            paging.page_size =  data?.per_page
        } catch (error) {
            console.log('error', error)
        } finally{
            loading.value = false
        }
    }

    watch(params, () => {
        getList()
    })
    
    onMounted(() => {
        getList()
    });

    const columns = [
        {
            label: '',
            props: 'index',
            width: '70px'
        },
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
            label: 'Role',
            props: 'role'
        }
    ]
</script>

<style scoped>

</style>