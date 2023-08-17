<template>
  <el-menu
        background-color="#1e64db"
        active-text-color="#ffd04b"
        text-color="#fff"
        :default-active="isActive"
        class="menu"
      >
        <nuxt-link class="titleLink" activeClass="active" :to="MAIN_ROUTER.HOMEPAGE">
          <el-menu-item :index="MAIN_ROUTER.HOMEPAGE">
            <el-icon><setting /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link class="titleLink" activeClass="active" :to="MAIN_ROUTER.USER">
            <el-menu-item :index="MAIN_ROUTER.USER">
            <el-icon><user /></el-icon>
            <span>Users</span>
          </el-menu-item>
        </nuxt-link>
      </el-menu> 
</template>

<script lang="ts" setup>
import {
  User,
  Setting,
} from '@element-plus/icons-vue'
// import { sitemap } from '~/route/sitemap';
import { MAIN_ROUTER } from "~/route";

const router = useRoute()
const isActive = computed(() => router.path)
</script>

<style>
  .titleLink {
    text-decoration: unset;
    color: #fff
  }
  .active{
    color: #ffd04b;
  }
</style>