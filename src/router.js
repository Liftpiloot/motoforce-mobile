import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './views/Login.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next('/login');
    } else {
        next();
    }
});

export default router;