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
            <el-table-column fixed="right" label="Operations" width="160px">
                <template #default="scope">
                    <el-button size="small" @click="getDetail(scope.row.id)">Edit</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="confirmDelete(scope.row)"
                    >Delete</el-button>
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

    const handleDelete = async (id) => {
        try {
            loading.value = true
            await userService.deleteUser(id);
            getList()
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        } catch (error) {
            
        } finally {
            loading.value = false
        }
    }

    const confirmDelete = (row) => {
        ElMessageBox.confirm(
            'Are you sure remove this account?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
        .then(() => {
            handleDelete(row.id)
        })
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