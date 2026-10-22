import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PhoneDetailView from "../views/PhoneDetailView.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/celular/:id',
        name: 'phone-detail',
        component: PhoneDetailView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router