<script setup lang="ts">
import CourseInfoCard from "@/components/CourseInfoCard.vue";
</script>

<template>
  <div class="course-list">
    <CourseInfoCard course-name="JavaScript从入门到精通" instructor="尚硅谷" duration="1:53:00"></CourseInfoCard>
    <CourseInfoCard course-name="Vue3从入门到精通" instructor="尚硅谷" duration="2:20:00"></CourseInfoCard>
    <CourseInfoCard course-name="React从入门到精通" instructor="B站UP主" duration="3:10:00"></CourseInfoCard>
  </div>
</template>

<style scoped>
.course-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>