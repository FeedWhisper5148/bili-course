<script setup lang="ts">
import {Link} from "@element-plus/icons-vue";

defineProps({
  courseName: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <el-card class="course-info-card" style="max-width: 480px">
    <div class="course-info-header">
      <h2>
        {{ courseName }}
        <el-icon><Link /></el-icon>
      </h2>
    </div>
    <div class="course-info-content">
      <p><strong>课程名称：</strong>{{ courseName }}</p>
      <p><strong>讲师：</strong>{{ instructor }}</p>
      <p><strong>课程时长：</strong>{{ duration }}</p>
    </div>
  </el-card>
</template>

<style scoped>

</style>