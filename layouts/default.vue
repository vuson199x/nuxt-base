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
                <el-dropdown-menu class="el-dropdown-menu">
                  <el-dropdown-item @click="isProfileDialog = true">
                    <el-icon><avatar /></el-icon>
                    <label>Profile</label>
                  </el-dropdown-item>
                  <el-dropdown-item @click="isChangePwdDialog = true">
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
  <Profile 
      v-if="isProfileDialog"
      :open="isProfileDialog"
      @onCancel="isProfileDialog = false"
  />
  <ProfileChangePwd
      v-if="isChangePwdDialog"
      :open="isChangePwdDialog"
      @onCancel="isChangePwdDialog = false"
  />
</template>

<script setup>
    import { MAIN_ROUTER } from "~/route";
    import { useUserStore } from "~/stores/userStore";
    import { ArrowDown, Avatar, Promotion, Lock } from '@element-plus/icons-vue';
    import authService from "~/services/auth";

    const router = useRouter();
    const user  = useUserStore();
    const token = useCookie('auth')
    let isProfileDialog = ref(false)
    let isChangePwdDialog = ref(false)

    const handleLogout = async () => {
      try {
        await authService.logout();
        token.value = null
        user.setUserInfo(null)
        router.push(MAIN_ROUTER.LOGIN);
      } catch (error) {}
    }

    const name = computed(() => user?.userInfo?.data?.name)
    const icon = computed(() => user?.userInfo?.data?.name.charAt(0))
</script>

<style>
  .common-layout{
    height: 100vh;
    overflow: hidden;
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

  .el-dropdown-menu label {
    cursor: pointer;
  }

  .el-main {
    overflow: auto;
    height: 100vh;
  }
</style>