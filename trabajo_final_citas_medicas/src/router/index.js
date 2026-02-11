import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CitaView from '../views/CitaView.vue'
import PacienteView from '@/views/PacienteView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/paciente',
    name: 'paciente',
    component: PacienteView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/citas',
    name: 'citas',
    component: CitaView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
