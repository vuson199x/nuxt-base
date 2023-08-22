<template>
    <h2>Sign Up</h2>
    <el-form
        label-width="100px"
        ref="formRef"
        :model="form"
        status-icon
        :rules="rules"
        style="width: 500px"
        label-position="top"
        size="default"
        @submit.prevent="handleSubmit(formRef)"
    >
        <el-form-item label="Username" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Phone number" prop="phone_number">
            <el-input v-model="form.phone_number" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirm_password">
            <el-input
                v-model="form.confirm_password"
                type="password"
                autocomplete="off"
            />
        </el-form-item>
        <el-form-item>
            <el-button size="large"  @click="router.push(MAIN_ROUTER.LOGIN)">
                Back
            </el-button>
            <el-button :loading="loading" native-type="submit" size="large" type="primary">
                Signup
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'login'
    })
    import type { FormInstance, FormRules } from 'element-plus';
    import { reactive, ref } from 'vue';
    import { MAIN_ROUTER } from "~/route";
    import authService from "~/services/auth";

    const router = useRouter();
    const loading = ref(false)

    const formRef = ref<FormInstance>()
    const form = toReactive({
        name: "",
        password: "",
        email: "",
        phone_number: "",
        confirm_password: "",
        role: "Manager",
    });

    const handleSignup = async () => {
        try {
            loading.value = true
            await authService.signup(form);
            ElMessage({
                type: 'success',
                message: 'Success!!!',
            })
            router.push(MAIN_ROUTER.LOGIN)
        } catch (error) {
            
        } finally{
            loading.value = false
        }
    }

    const handleSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid) => {
            if (!valid) return
            console.log('form', form)
            handleSignup()
        }) 
    };

    const rules = reactive<FormRules>({
        name: [
            { required: true, trigger: ['blur', 'change'] },
            { min: 3, max: 100, trigger: ['blur', 'change'] },
        ],
        email: [
            { required: true, trigger: ['blur', 'change'] },
            { type: 'email', trigger: ['blur', 'change'] },
        ],
        phone_number: [
            { required: true, trigger: ['blur', 'change'] },
            { min: 9, max: 11, trigger: ['blur', 'change'] },
        ],
        password: [
            { required: true, trigger: ['blur', 'change'] },
        ],
        confirm_password: [
            { required: true, trigger: ['blur', 'change'] },
        ],
    })
</script>

<style scoped>
</style>