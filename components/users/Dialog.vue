<template>
  <Teleport to="body">
    <el-dialog v-model="open" width="500px" :title="data ? 'Edit User' : 'Create new user'" @close="emit('onCancel')">
      <el-form :model="form" label-position="top">
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off" class="el-input"/>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" autocomplete="off" class="el-input"/>
        </el-form-item>
        <el-form-item label="Phone number">
          <el-input v-model="form.phone_number" autocomplete="off" class="el-input"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emit('onCancel')">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="loading">
            Submit
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import userService from "~/services/user"
const props = defineProps<{
  open: boolean;
  data: any
}>();

const emit = defineEmits(["onCancel", "getList", "update:open"])
let loading = ref(false)
const form = reactive({
  name: props?.data?.name || '',
  email: props?.data?.email || '',
  phone_number: props?.data?.phone_number || '',
  account_types: [],
  authority: "manager",
  department: null,
  position: null,
  roles: [],
})


const handleEdit = async () => {
  try {
      loading.value = true
      await userService.updateUser({
        ...form,
        id: props.data.id
      });
      emit('onCancel')
      emit('getList')
      ElMessage({
          type: 'success',
          message: 'Update completed',
      })
  } catch (error) {
      console.log('error', error)
  } finally{
      loading.value = false
  }
}

const handleCreate = async () => {
  try {
      loading.value = true
      await userService.createUser(form);
      emit('onCancel')
      emit('getList')
      ElMessage({
          type: 'success',
          message: 'Add completed',
      })
  } catch (error) {
      console.log('error', error)
  } finally{
      loading.value = false
  }
}

const handleSubmit = () => {
  if(props.data){
    handleEdit()
  }else {
    handleCreate()
  }
}

const open = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit("update:open", value);
  },
});
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 100%;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>