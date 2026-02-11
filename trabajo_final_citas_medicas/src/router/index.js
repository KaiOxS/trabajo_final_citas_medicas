import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CitaView from '../views/CitaView.vue'
import PacienteView from '@/views/PacienteView.vue'
import DoctorView from '@/views/DoctorView.vue' // ← AGREGAR

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
    path: '/doctores', // ← AGREGAR
    name: 'doctores',
    component: DoctorView
  },
  {
    path: '/citas',
    name: 'citas',
    component: CitaView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router