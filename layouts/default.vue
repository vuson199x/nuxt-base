<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-container>
        <el-header class="header">
            <div>Header</div>
            <el-dropdown class="dropdown">
              <span class="el-dropdown-link">
                {{user?.userInfo?.data?.name}}
               <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout()">Logout</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-header>
        <el-main><slot /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
    import { MAIN_ROUTER } from "~/route";
    import { useUserStore } from "~/stores/userStore";
    import { ArrowDown } from '@element-plus/icons-vue';
    import { useAuthStore } from "~/stores/authStore";

    const router = useRouter();
    const user  = useUserStore();
    const auth  = useAuthStore();

    const handleLogout = () => {
        user.setUserInfo(null)
        auth.setSession(null)
        router.push(MAIN_ROUTER.LOGIN);
    }
</script>

<style>
  .common-layout{
    height: 100vh;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    height: 50px;
    border-bottom: 1px solid #c0c4cc;
  }

  .aside{
    background: lightblue;
    text-align: center;
    height: 100vh;
    padding: 15px;
  }

  .el-dropdown-link:focus-visible {
    outline: none
  } 
</style>