import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export interface Course {
  courseName: string
  instructor: string
  duration: string
  bvId: string
}

const STORAGE_KEY = 'bili-courses-data'

// 从 LocalStorage 加载数据
function loadFromStorage(): Course[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to load courses from localStorage:', error)
  }
  // 默认数据
  return [
    { courseName: 'JavaScript从入门到精通', instructor: '尚硅谷', duration: '1:53:00', bvId: 'BV1xx411x7zq' },
    { courseName: 'Vue3从入门到精通', instructor: '尚硅谷', duration: '2:20:00', bvId: 'BV1xx411x7zr' },
    { courseName: 'React从入门到精通', instructor: 'B站UP主', duration: '3:10:00', bvId: 'BV1xx411x7zs' },
  ]
}

// 保存数据到 LocalStorage
function saveToStorage(courses: Course[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
  } catch (error) {
    console.error('Failed to save courses to localStorage:', error)
  }
}

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref<Course[]>(loadFromStorage())

  // 监听 courses 变化，自动保存到 LocalStorage
  watch(
    courses,
    (newCourses) => {
      saveToStorage(newCourses)
    },
    { deep: true }
  )

  function addCourse(course: Course) {
    courses.value.push(course)
  }

  function removeCourse(index: number) {
    courses.value.splice(index, 1)
  }

  return { courses, addCourse, removeCourse }
})
