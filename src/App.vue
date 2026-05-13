<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import CourseInfoCard from "@/components/CourseInfoCard.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="10">
          <el-col :span="4" class="title">
            BiliCourse网课管理系统
          </el-col>
          <el-col :span="10">
            <Navigation></Navigation>
          </el-col>
          <el-col :span="5" class="title">
            <el-button type="primary">添加课程</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="card-container">
        <CourseInfoCard course-name="JavaScript从入门到精通" instructor="尚硅谷" duration="1:53:00"></CourseInfoCard>
        <CourseInfoCard course-name="Vue3从入门到精通" instructor="尚硅谷" duration="2:20:00"></CourseInfoCard>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  //background-color: grey;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.title {
  line-height: 60px;
  text-align: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
