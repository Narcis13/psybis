const routes = [
   {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('../pages/Index.vue') },
        { path: '/studio', component: () => import('../pages/Studio.vue') },
        { path: '/receptie', component: () => import('../pages/Receptie.vue') }
       
      ]
    },
   

    {
      path: '/:catchAll(.*)*',
      component: () => import('../pages/Error404.vue')
    }
  ]
  
  export default routes
