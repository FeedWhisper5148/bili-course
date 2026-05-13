<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
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
        <router-view></router-view>
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
