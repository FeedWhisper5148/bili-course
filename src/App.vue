<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import { useCoursesStore } from "@/stores/courses";
import { ref, reactive } from "vue";

const coursesStore = useCoursesStore();
const dialogVisible = ref(false);
const formRef = ref();

const form = reactive({
  courseName: '',
  instructor: '',
  duration: '',
  bvId: '',
});

const rules = {
  courseName: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
  instructor: [{ required: true, message: '请输入讲师', trigger: 'blur' }],
  duration: [{ required: true, message: '请输入课程时长', trigger: 'blur' }],
  bvId: [{ required: true, message: '请输入BV号', trigger: 'blur' }],
};

const addCourse = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      coursesStore.addCourse({
        courseName: form.courseName,
        instructor: form.instructor,
        duration: form.duration,
        bvId: form.bvId,
      });
      dialogVisible.value = false;
      form.courseName = '';
      form.instructor = '';
      form.duration = '';
      form.bvId = '';
    }
  });
};
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
            <el-button type="primary" @click="dialogVisible = true">添加课程</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="card-container">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog v-model="dialogVisible" title="添加课程" width="500px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="讲师" prop="instructor">
          <el-input v-model="form.instructor" placeholder="请输入讲师"></el-input>
        </el-form-item>
        <el-form-item label="课程时长" prop="duration">
          <el-input v-model="form.duration" placeholder="请输入课程时长"></el-input>
        </el-form-item>
        <el-form-item label="BV号" prop="bvId">
          <el-input v-model="form.bvId" placeholder="请输入BV号"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addCourse">确认</el-button>
        </span>
      </template>
    </el-dialog>
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
