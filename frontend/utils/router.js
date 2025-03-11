import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store.js';

import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import RegisterPage from '../pages/RegisterPage.js';
import BlogsListPage from '../pages/BlogsListPage.js';
import DisplayBlogPage from '../pages/DisplayBlogPage.js';
import AdminDashboardPage from '../pages/AdminDashboardPage.js';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/feed', component: BlogsListPage, meta: { requiresLogin: true } },
    { path: '/blogs/:id', component: DisplayBlogPage, props: true, meta: { requiresLogin: true } },
    { path: '/admin-dashboard', component: AdminDashboardPage, meta: { requiresLogin: true, role: 'admin' } },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

// Navigation Guards for Authentication & Authorization
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.state.loggedIn) {
            next({ path: '/login' });
        } else if (to.meta.role && to.meta.role !== store.state.role) {
            alert('Access Denied: Unauthorized Role');
            next({ path: '/' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;