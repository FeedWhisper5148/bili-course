<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCoursesStore } from '@/stores/courses'

// 定义笔记接口
interface Note {
  id: string
  content: string
  timestamp: number // 视频时间点（秒）
  createdAt: number // 创建时间戳
}

const route = useRoute()
const coursesStore = useCoursesStore()

const bvId = computed(() => route.params.bvId as string)
const course = computed(() => 
  coursesStore.courses.find(c => c.bvId === bvId.value)
)

// 笔记列表
const notes = ref<Note[]>([])

// 笔记输入相关
const newNoteContent = ref('')
const noteHour = ref(0)
const noteMinute = ref(0)
const noteSecond = ref(0)

// 生成唯一 ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 格式化时间为 MM:SS 或 HH:MM:SS
const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 将时分秒转换为总秒数
const getTimeInSeconds = () => {
  return noteHour.value * 3600 + noteMinute.value * 60 + noteSecond.value
}

// 从 localStorage 加载笔记
const loadNotes = () => {
  try {
    const saved = localStorage.getItem(`notes-${bvId.value}`)
    if (saved) {
      notes.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Failed to load notes:', error)
    notes.value = []
  }
}

// 保存笔记到 localStorage
const saveNotes = () => {
  try {
    localStorage.setItem(`notes-${bvId.value}`, JSON.stringify(notes.value))
  } catch (error) {
    console.error('Failed to save notes:', error)
  }
}

// 添加笔记
const handleAddNote = () => {
  if (!newNoteContent.value.trim()) {
    return
  }
  
  const timestamp = getTimeInSeconds()
  addNote(newNoteContent.value, timestamp)
  
  // 清空输入
  newNoteContent.value = ''
  noteHour.value = 0
  noteMinute.value = 0
  noteSecond.value = 0
}

const addNote = (content: string, timestamp: number) => {
  const newNote: Note = {
    id: generateId(),
    content,
    timestamp,
    createdAt: Date.now()
  }
  notes.value.push(newNote)
  saveNotes()
}

// 删除笔记
const deleteNote = (id: string) => {
  const index = notes.value.findIndex(note => note.id === id)
  if (index > -1) {
    notes.value.splice(index, 1)
    saveNotes()
  }
}

// 更新笔记
const updateNote = (id: string, content: string, timestamp: number) => {
  const note = notes.value.find(note => note.id === id)
  if (note) {
    note.content = content
    note.timestamp = timestamp
    saveNotes()
  }
}

onMounted(() => {
  loadNotes()
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
            </div>

            <!-- 使用 el-splitter 实现上下分隔 -->
            <el-splitter layout="vertical" class="notes-splitter">
              <!-- 上方：笔记输入区 -->
              <el-splitter-panel min="20%" size="50%" class="note-input-panel">
                <div class="note-input-area">
                  <div class="time-input-group">
                    <span class="time-label">时间点：</span>
                    <el-input-number 
                      v-model="noteHour" 
                      :min="0" 
                      :max="99"
                      size="small"
                      controls-position="right"
                      style="width: 80px;"
                      placeholder="时"
                    >
                      <template #prefix>
                        <span style="font-size: 12px;">时</span>
                      </template>
                    </el-input-number>
                    <span class="time-separator">:</span>
                    <el-input-number 
                      v-model="noteMinute" 
                      :min="0" 
                      :max="59"
                      size="small"
                      controls-position="right"
                      style="width: 80px;"
                      placeholder="分"
                    >
                      <template #prefix>
                        <span style="font-size: 12px;">分</span>
                      </template>
                    </el-input-number>
                    <span class="time-separator">:</span>
                    <el-input-number 
                      v-model="noteSecond" 
                      :min="0" 
                      :max="59"
                      size="small"
                      controls-position="right"
                      style="width: 80px;"
                      placeholder="秒"
                    >
                      <template #prefix>
                        <span style="font-size: 12px;">秒</span>
                      </template>
                    </el-input-number>
                  </div>
                  
                  <div class="time-preview">
                    对应时间: {{ formatTime(getTimeInSeconds()) }}
                  </div>
                  
                  <el-input
                    v-model="newNoteContent"
                    type="textarea"
                    :rows="4"
                    placeholder="输入笔记内容..."
                    class="note-textarea"
                    @keyup.ctrl.enter="handleAddNote"
                  />
                  
                  <div class="add-note-button-wrapper">
                    <el-button 
                      type="primary" 
                      @click="handleAddNote"
                      :disabled="!newNoteContent.trim()"
                      style="width: 100%;"
                    >
                      <el-icon><Plus /></el-icon>
                      添加笔记 (Ctrl+Enter)
                    </el-button>
                  </div>
                </div>
              </el-splitter-panel>

              <!-- 下方：笔记展示区 -->
              <el-splitter-panel min="30%" size="65%" class="note-list-panel">
                <div class="note-list-area">
                  <div v-if="notes.length === 0" class="empty-notes">
                    <el-empty description="暂无笔记" :image-size="80">
                      <template #description>
                        <p>开始学习并记录你的第一条笔记吧！</p>
                      </template>
                    </el-empty>
                  </div>
                  
                  <div v-else class="notes-list">
                    <el-card 
                      v-for="note in notes" 
                      :key="note.id" 
                      class="note-card"
                      shadow="hover"
                    >
                      <div class="note-card-header">
                        <el-tag 
                          type="primary" 
                          size="small"
                          class="timestamp-tag"
                        >
                          <el-icon><VideoPlay /></el-icon>
                          {{ formatTime(note.timestamp) }}
                        </el-tag>
                        <div class="note-actions">
                          <el-button 
                            type="danger" 
                            size="small" 
                            link
                            @click="deleteNote(note.id)"
                          >
                            <el-icon><Delete /></el-icon>
                          </el-button>
                        </div>
                      </div>
                      <div class="note-card-content">
                        {{ note.content }}
                      </div>
                      <div class="note-card-footer">
                        <span class="create-time">
                          {{ new Date(note.createdAt).toLocaleString('zh-CN') }}
                        </span>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-splitter-panel>
            </el-splitter>
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

.notes-splitter {
  height: calc(100% - 57px);
}

.note-input-panel {
  position: relative;
  overflow: hidden;
}

.note-input-area {
  padding: 15px;
  padding-bottom: 80px; /* 为按钮和分隔条预留足够空间 */
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.time-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.time-label {
  font-size: 13px;
  color: #606266;
  font-weight: 500;
}

.time-separator {
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}

.time-preview {
  font-size: 12px;
  color: #606266;
  margin-bottom: 8px;
  padding: 4px 8px;
  background: #f5f7fa;
  border-radius: 4px;
  flex-shrink: 0;
}

.note-textarea {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  min-height: 80px;
}

.add-note-button-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px 15px 15px 15px;
  margin-top: auto;
  z-index: 100;
  flex-shrink: 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.note-list-area {
  height: 100%;
  overflow-y: auto;
  padding: 15px;
}

.empty-notes {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.note-card {
  transition: all 0.3s;
}

.note-card:hover {
  transform: translateY(-2px);
}

.note-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.timestamp-tag {
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.timestamp-tag:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.note-actions {
  display: flex;
  gap: 8px;
}

.note-card-content {
  font-size: 14px;
  line-height: 1.6;
  color: #303133;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 10px;
}

.note-card-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid #ebeef5;
}

.create-time {
  font-size: 12px;
  color: #909399;
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
