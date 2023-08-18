<template>
  <Teleport to="body">
    <el-dialog v-model="open" width="500px" :title="data ? 'Edit blog' : 'Create new blog'" @close="emit('onCancel')">
      <el-form  ref="formRef" :model="form" label-position="top" :rules="rules" status-icon>
        <el-form-item label="Title" prop="title">
          <el-input v-model="form.title" autocomplete="off" class="el-input"/>
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input
            v-model="form.content"
            maxlength="500"
            placeholder="Please input"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="Thumbnail" prop="thumbnail">
          <common-upload @handleChange="handleChange" :url="data?.thumbnail"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emit('onCancel')">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit(formRef)" :loading="loading">
            Submit
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import blogService from "~/services/blog"
const props = defineProps<{
  open: boolean;
  data: any
}>();

const emit = defineEmits(["onCancel", "getList", "update:open"])

let loading = ref(false)
const imageUrl = ref('')
const formRef = ref<FormInstance>()
const form = reactive({
  title : props?.data?.title  || '',
  content: props?.data?.content || '',
  thumbnail: props?.data?.thumbnail || '',
})

const handleEdit = async () => {
  try {
      loading.value = true
      await blogService.updateBlog({
        ...form,
        thumbnail: props?.data?.thumbnail ? null : form.thumbnail,
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
      await blogService.createBlog(form);
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

const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (!valid) return
        props.data ? handleEdit() : handleCreate()
    }) 
}

const handleChange = (file: any) => {
  console.log('value', file)
  let data = new FormData();
  data.append("file", file)
  form.thumbnail = {...file}
}

const open = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit("update:open", value);
  },
});

const rules = reactive<FormRules>({
  title: [
      { required: true, trigger: ['blur', 'change'] },
      { min: 3, max: 100, trigger: ['blur', 'change'] },
  ],
  content : [
      { required: true, trigger: ['blur', 'change'] },
      { min: 3, max: 500, trigger: ['blur', 'change'] },
  ],
  thumbnail: [
      { required: true, trigger: ['blur', 'change'] },
  ],
})
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