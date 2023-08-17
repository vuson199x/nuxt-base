<template>
  <el-menu
        background-color="#1e64db"
        active-text-color="#ffd04b"
        text-color="#fff"
        default-active="1"
        class="menu"
      >
        <nuxt-link class="titleLink" activeClass="active" :to="MAIN_ROUTER.HOMEPAGE">
          <el-menu-item index="1">
            <el-icon><setting /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link class="titleLink" activeClass="active" :to="MAIN_ROUTER.USER">
            <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Users</span>
          </el-menu-item>
        </nuxt-link>
      </el-menu> 
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
// import { sitemap } from '~/route/sitemap';
import { MAIN_ROUTER } from "~/route";
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