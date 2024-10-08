import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './views/Login.vue';
import Register from "@/views/Register.vue";

const routes = [
    { path: '/', redirect: '/register' },
    { path: '/login', component: Login },
    {path: '/register', component: Register},
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