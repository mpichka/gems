import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import ProductCreator from './views/ProductCreator.vue'

const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/new', name: 'New Product', component: ProductCreator }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
