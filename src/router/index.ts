import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ConvertView from '@/views/ConvertView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/convert', component: ConvertView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
