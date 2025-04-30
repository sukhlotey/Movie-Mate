import { createRouter, createWebHistory } from 'vue-router'
import Movies from '@/components/Movies.vue'
import Movie from '@/components/Movie.vue'

const routes = [
  { path: '/', name: 'Home', component: Movies },
  { path: '/movie/:name', name: 'Movie', component: Movie, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
