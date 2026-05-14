<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const handleMenuSelect = (index: string) => {
  router.push({ name: index });
};
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :default-active="route.name as string" @select="handleMenuSelect">
    <el-menu-item index="course-list">课程列表</el-menu-item>
    <el-menu-item index="study-notes">学习笔记</el-menu-item>
    <el-menu-item index="mind-map">思维导图</el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>