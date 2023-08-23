<template>
    <h2>Login</h2>
    <el-dialog v-model="open" width="500px" title="Change password" @close="emit('onCancel')">
        <el-form  ref="formRef" :model="form" label-position="top" :rules="rules" status-icon @submit.prevent="handleSubmit(formRef)">
            <el-form-item label="Old password:" prop="old_password">
            <el-input v-model="form.old_password" type="password" autocomplete="off"  show-password/>
            </el-form-item>
            <el-form-item label="New Password:" prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off"  show-password/>
            </el-form-item>
            <el-form-item label="Confirm Password:" prop="password_confirmation">
            <el-input v-model="form.password_confirmation" type="password" autocomplete="off"  show-password/>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" native-type="submit" size="large" class="btnSubmit" :loading="loading">
                Submit
            </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
    import { FormInstance, FormRules } from "element-plus";
    import userService from "~/services/user";
    import usePassword from '~/composables/usePassword'

    const props = defineProps<{
        open: boolean;
    }>();

    const emit = defineEmits(["onCancel", "update:open"])
    const loading = ref(false)
    const formRef = ref<FormInstance>()
    const form = toReactive({
        old_password: "",
        password: "",
        password_confirmation: ""
    });

    const {checkPwd, checkConfirmPwd} = usePassword(form, formRef)

    const handleChangePwd = async () => {
        try {
            loading.value = true
            await userService.changePwd(form);
            emit('onCancel')
            ElMessage({
                type: 'success',
                message: 'Change password completed',
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
            handleChangePwd()
        }) 
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
        old_password: [
            { required: true, trigger: ['blur', 'change'] },
            { min: 3, max: 10, trigger: ['blur', 'change'] },
        ],
        password : [
            { validator: checkPwd, trigger: 'blur' },
            { required: true, trigger: ['blur', 'change'] },
            { min: 3, max: 10, trigger: ['blur', 'change'] },
        ],
        password_confirmation: [
            { validator: checkConfirmPwd, trigger: 'blur' },
            { required: true, trigger: ['blur', 'change'] },
        ],
    })
</script>

<style scoped>
    .btnSubmit {
        display: block;
        margin: 0 auto;
    }
</style>
