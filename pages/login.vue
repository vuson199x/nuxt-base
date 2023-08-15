<template>
   <div class="container">
    <h1>Login</h1>
    <el-form
        label-width="100px"
        :model="form"
        style="width: 500px"
        label-position="top"
        size="default"
      >
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" autocomplete="off"  show-password/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="handleSubmit">
            Login
          </el-button>
        </el-form-item>
      </el-form>
   </div>
 
</template>

<script setup>
    definePageMeta({
        layout: 'login'
    })
    import { useAuthStore } from "~/stores/authStore";
    import userService from "~/services/user";
    import { MAIN_ROUTER } from "~/route";

    const router = useRouter();
    const store = useAuthStore();
    const form = toReactive({
        username: "",
        password: "",
    });

    const handleSubmit = async () => {
      try {
          const session = await userService.login(form);
          if (session) {
            store.setSession(session);
            router.push(MAIN_ROUTER.HOMEPAGE);
          }
      } catch (error) {}
    };
</script>

<style scoped>
  .container {
    background: #fff;
    border: 1px solid #c0c4cc;
    border-radius: 10px;
    padding: 20px 20px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
      text-align: center;
  }

  button {
    display: block;
    margin: 0 auto;
  }
</style>
