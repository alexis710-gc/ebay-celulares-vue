import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import PhoneDetailPage from "../pages/PhoneDetailPage.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/celular/:id',
        name: 'phone-detail',
        component: PhoneDetailPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router