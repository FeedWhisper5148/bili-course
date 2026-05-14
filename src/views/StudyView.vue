<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCoursesStore } from '@/stores/courses'

const route = useRoute()
const coursesStore = useCoursesStore()

const bvId = computed(() => route.params.bvId as string)
const course = computed(() => 
  coursesStore.courses.find(c => c.bvId === bvId.value)
)

const noteContent = ref('')

// 从 localStorage 加载笔记
const loadNote = () => {
  try {
    const saved = localStorage.getItem(`note-${bvId.value}`)
    if (saved) {
      noteContent.value = saved
    }
  } catch (error) {
    console.error('Failed to load note:', error)
  }
}

// 保存笔记到 localStorage
const saveNote = () => {
  try {
    localStorage.setItem(`note-${bvId.value}`, noteContent.value)
  } catch (error) {
    console.error('Failed to save note:', error)
  }
}

onMounted(() => {
  loadNote()
})
</script>

<template>
  <div class="study-container">
    <div v-if="course" class="study-header">
      <h1>{{ course.courseName }}</h1>
      <p class="course-meta">
        <span>讲师: {{ course.instructor }}</span>
        <span>时长: {{ course.duration }}</span>
      </p>
    </div>

    <div class="study-content">
      <el-splitter>
        <el-splitter-panel min="20%" size="50%">
          <!-- 左侧视频区域 -->
          <div class="video-section">
            <div class="video-container">
              <iframe
                v-if="bvId"
                :src="`https://player.bilibili.com/player.html?bvid=${bvId}&page=1&high_quality=1&danmaku=0`"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
                class="bilibili-player"
              ></iframe>
            </div>
          </div>
        </el-splitter-panel>

        <el-splitter-panel min="20%" size="50%">
          <!-- 右侧笔记区域 -->
          <div class="notes-section">
            <div class="notes-header">
              <h2>学习笔记</h2>
              <el-button type="primary" @click="saveNote" size="small">
                <el-icon><Check /></el-icon>
                保存笔记
              </el-button>
            </div>
            <el-input
              v-model="noteContent"
              type="textarea"
              :rows="25"
              placeholder="在这里记录你的学习笔记..."
              class="notes-textarea"
              @input="saveNote"
            />
          </div>
        </el-splitter-panel>
      </el-splitter>
    </div>
  </div>
</template>

<style scoped>
.study-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.study-header {
  padding: 15px 20px;
  border-bottom: 2px solid #e4e7ed;
  background: #fff;
  flex-shrink: 0;
}

.study-header h1 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #303133;
}

.course-meta {
  display: flex;
  gap: 20px;
  color: #606266;
  font-size: 13px;
  margin: 0;
}

.study-content {
  flex: 1;
  overflow: hidden;
}

.study-content :deep(.el-splitter) {
  height: 100%;
}

.video-section {
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-container {
  width: 100%;
  height: 100%;
  position: relative;
  aspect-ratio: 16 / 9;
  max-height: 100%;
}

.bilibili-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.notes-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 0;
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e4e7ed;
  flex-shrink: 0;
}

.notes-header h2 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.notes-textarea {
  flex: 1;
  overflow: hidden;
}

.notes-textarea :deep(.el-textarea__inner) {
  height: 100% !important;
  resize: none;
  font-size: 14px;
  line-height: 1.8;
  border: none;
  border-radius: 0;
}

@media (max-width: 768px) {
  .study-content :deep(.el-splitter) {
    flex-direction: column;
  }

  .video-section {
    height: 40vh;
  }
}
</style>
