import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Course {
  courseName: string
  instructor: string
  duration: string
  bvId: string
}

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref<Course[]>([
    { courseName: 'JavaScript从入门到精通', instructor: '尚硅谷', duration: '1:53:00', bvId: 'BV1xx411x7zq' },
    { courseName: 'Vue3从入门到精通', instructor: '尚硅谷', duration: '2:20:00', bvId: 'BV1xx411x7zr' },
    { courseName: 'React从入门到精通', instructor: 'B站UP主', duration: '3:10:00', bvId: 'BV1xx411x7zs' },
  ])

  function addCourse(course: Course) {
    courses.value.push(course)
  }

  function removeCourse(index: number) {
    courses.value.splice(index, 1)
  }

  return { courses, addCourse, removeCourse }
})
