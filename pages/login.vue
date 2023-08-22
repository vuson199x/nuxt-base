<template>
    <h2>Login</h2>
    <el-form
        label-width="100px"
        :model="form"
        style="width: 500px"
        label-position="top"
        size="default"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" autocomplete="off"  show-password/>
        </el-form-item>
        <el-form-item>
          <el-alert 
            title="Account: son.vu2@sotatek.com | 123123123" 
            type="success" 
          />
          <el-button type="primary" native-type="submit" size="large" >
            Login
          </el-button>
        </el-form-item>
        <el-text class="create-account" type="primary" @click="router.push(MAIN_ROUTER.SIGNUP)">Create account</el-text>
    </el-form>
</template>

<script setup>
    definePageMeta({
        layout: 'login'
    })
    import authService from "~/services/auth";
    import { MAIN_ROUTER } from "~/route";
    const router = useRouter();
    const token  = useCookie('auth')
    const form = toReactive({
        username: "",
        password: "",
    });

    const handleSubmit = async () => {
      try {
          const session = await authService.login(form);
          if (session) {
            token.value = session
            router.push(MAIN_ROUTER.HOMEPAGE);
          }
      } catch (error) {}
    };
</script>

<style scoped>
  .create-account {
    display: block;
    text-align: center;
    cursor: pointer;
  }
</style>
