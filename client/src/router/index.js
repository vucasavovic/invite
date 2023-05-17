import { createRouter, createWebHistory } from 'vue-router'
import DashboardHomeView from '../views/DashboardHomeView.vue'
import InvitationView from '../views/InvitationView.vue'
import EntryView from '../views/EntryView.vue'
import { useMainStore } from '../stores/main'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dash',
      name: 'home',
      component: DashboardHomeView
    },
  
    {
      path: '/invitation',
      name: 'Invitation',
      component: InvitationView
    },
    {
      path: '/entry/:mode',
      name: 'Entry',
      component: EntryView
    }
     
  ]
})


router.beforeEach((to, from,next) => {
  const mainStore = useMainStore();
   if(to.name!= "Entry" && !mainStore.userLogged){
     next('/entry/login')
   } else{
    next();
   }
})

export default router
