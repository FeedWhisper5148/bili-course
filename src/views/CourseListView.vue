<script setup lang="ts">
import CourseInfoCard from "@/components/CourseInfoCard.vue";
import { useCoursesStore } from "@/stores/courses";

const coursesStore = useCoursesStore();
</script>

<template>
  <div class="course-list">
    <CourseInfoCard
      v-for="(course, index) in coursesStore.courses"
      :key="course.courseName"
      :course-name="course.courseName"
      :instructor="course.instructor"
      :duration="course.duration"
      :bv-id="course.bvId"
      :on-delete="() => coursesStore.removeCourse(index)"
    />
  </div>
</template>

<style scoped>
.course-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>