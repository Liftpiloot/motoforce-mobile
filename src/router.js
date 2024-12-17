import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './views/Login.vue';
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import Result from "@/views/Result.vue";
import {DESKTOP_URL} from "@/config.js";

const routes = [
    { path: '/', redirect: '/register' },
    { path: '/login', component: Login },
    {path: '/register', component: Register},
    {
        path : '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/result/:routeId',
        name: 'Result',
        component: Result,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    if (to.path === '/dashboard' && !user) {
        next('/login');
    } else if (to.path === '/dashboard' && window.innerWidth > 1024) {
        const userInfo = encodeURIComponent(JSON.stringify(user));
        window.location.href = `${DESKTOP_URL}?user=${userInfo}`;
    } else {
        next();
    }
});

export default router;