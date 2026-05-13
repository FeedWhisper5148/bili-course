<script setup lang="ts">
import {Link} from "@element-plus/icons-vue";

const props = defineProps({
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
  bvId: {
    type: String,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  },
});

const jumpToBilibili = () => {
  window.open(`https://www.bilibili.com/video/${props.bvId}`, '_blank');
};
</script>

<template>
  <el-card class="course-info-card" style="max-width: 480px">
    <div class="course-info-header">
      <el-link :href="'https://www.example.com/courses/' + courseName" target="_blank">
        <h2>{{ courseName }}</h2>
        <el-icon>
          <Link/>
        </el-icon>
      </el-link>
    </div>
    <div class="course-info-content">
      <p><strong>课程名称：</strong>{{ courseName }}</p>
      <p><strong>讲师：</strong>{{ instructor }}</p>
      <p><strong>课程时长：</strong>{{ duration }}</p>
      <p><strong>BV号：</strong>
        <el-link :href="'https://www.bilibili.com/video/' + bvId" target="_blank">{{ bvId }}</el-link>
      </p>
    </div>
    <div class="course-actions">
      <el-button type="primary" @click="jumpToBilibili">跳转到B站</el-button>
      <el-button type="danger" @click="onDelete">删除</el-button>
    </div>
  </el-card>
</template>

<style scoped>

</style>