import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import CitaView from '@/views/CitaView.vue'
import PacienteView from '@/views/PacienteView.vue'
import DoctorView from '@/views/DoctorView.vue' 

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/paciente',
    name: 'paciente',
    component: PacienteView,
    meta: { 
      requiereAutorizacion: true 
    }
  },
  {
    path: '/doctores', 
    name: 'doctores',
    component: DoctorView,
    meta: {
      requiereAutorizacion: true 
    }
  },
  {
    path: '/citas',
    name: 'citas',
    component: CitaView,
    meta: {
      requiereAutorizacion: true 
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.meta.requiereAutorizacion){
    /*le envio a auna pagina de login */
    const estaAutenticado= localStorage.getItem("estaAutenticado");
    const token= localStorage.getItem("token");
    if(!estaAutenticado){
      console.log("Redirigiendo al login");
      next({name: 'login'})
    }else{
      next();
    }
  }else{
    /*le dejo sin validaciones */
    console.log("Pase libre");
    next();
  }
})

export default router