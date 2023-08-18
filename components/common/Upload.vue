<template>
    <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
</template>
  
<script lang="ts" setup>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import type { UploadProps } from 'element-plus'

    const props = defineProps<{
        url: string | null
    }>();

    const emit = defineEmits(["handleChange"])
  
    const imageUrl = ref('')
    
    const handleSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        imageUrl.value = URL.createObjectURL(uploadFile.raw!)
        emit("handleChange", uploadFile.raw!)
    }
  
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('Avatar picture must be JPG format!')
            return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('Avatar picture size can not exceed 2MB!')
            return false
        }
        return true
    }

    onMounted(() => {
        imageUrl.value = props.url || ''
    })
</script>
  
<style scoped>
  .avatar-uploader .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
  
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
  }
</style>