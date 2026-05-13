<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :router="true" :default-active="route.name">
    <el-menu-item index="course-list">课程列表</el-menu-item>
    <el-menu-item index="study-notes">学习笔记</el-menu-item>
    <el-menu-item index="mind-map">思维导图</el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>