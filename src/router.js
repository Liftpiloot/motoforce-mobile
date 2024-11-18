import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './views/Login.vue';
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import Result from "@/views/Result.vue";

const routes = [
    { path: '/', redirect: '/register' },
    { path: '/login', component: Login },
    {path: '/register', component: Register},
    {path : '/dashboard', component: Dashboard},
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
    if (to.path === '/') {
        next('/register');
    } else {
        next();
    }
});

export default router;