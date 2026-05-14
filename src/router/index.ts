import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/course-list',
    },
    {
      path: '/course-list',
      name: 'course-list',
      component: () => import('../views/CourseListView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/study-notes',
      name: 'study-notes',
      component: () => import('../views/StudyNotesView.vue'),
    },
    {
      path: '/mind-map',
      name: 'mind-map',
      component: () => import('../views/MindMapView.vue'),
    },
    {
      path: '/study/:bvId',
      name: 'study',
      component: () => import('../views/StudyView.vue'),
      props: true
    }
  ],
})

export default router
