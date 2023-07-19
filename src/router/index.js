import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/convert',
      name: 'convert',
      component: () => import('../views/ConvertView.vue'),
      beforeEnter(){
        if (!localStorage.getItem('token')) {
          return false
          
        }
      }
    }
  ]
})

export default router
