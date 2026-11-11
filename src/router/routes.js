
const routes = [
  {path: '/', name: 'home', component: () => import ('../pages/HomePage.vue')},  
  { path: '/phone/:id', component: () => import('../pages/PhoneDetailPage.vue'), props: true },
  { path: '/publicar', component: () => import('../pages/PublishPage.vue') },
  { path: '/:catchAll(.*)*', redirect: '/' }
]

export default routes