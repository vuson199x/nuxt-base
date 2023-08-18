<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside" width="200px">
        <LayoutMenu />
      </el-aside>
      <el-container>
        <el-header class="header">
            <div>Nuxt Base</div>
            <el-dropdown class="dropdown" v-if="user?.userInfo">
              <span class="el-dropdown-link">
                <el-avatar :size="25"> {{ icon }} </el-avatar>
                {{name}}
               <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-icon><avatar /></el-icon>
                    <label>Profile</label>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><lock /></el-icon>
                    <label>Change password</label>
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleLogout()">
                    <el-icon><promotion /></el-icon>
                    <label>Logout</label>
                  </el-dropdown-item>
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
    import { ArrowDown, Avatar, Promotion, Lock } from '@element-plus/icons-vue';
    import { useAuthStore } from "~/stores/authStore";
    import authService from "~/services/auth";

    const router = useRouter();
    const user  = useUserStore();
    const auth  = useAuthStore();

    const handleLogout = async () => {
      try {
        await authService.logout();
        user.setUserInfo(null)
        auth.setSession(null)
        router.push(MAIN_ROUTER.LOGIN);
      } catch (error) {
        
      }
    }

    const name = computed(() => user?.userInfo?.data?.name)
    const icon = computed(() => user?.userInfo?.data?.name.charAt(0))
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
    background: #1e64db;
    text-align: center;
    height: 100vh;
  }

  .el-dropdown-link:focus-visible {
    outline: none
  } 
</style>