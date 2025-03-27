import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import RegisterPage from '../pages/RegisterPage.js';
import AdminDashboard from '../pages/AdminDashboard.js';
import AdminSearch from '../pages/AdminSearch.js';
import AdminSummary from '../pages/AdminSummary.js';
import CustomerDashboard from '../pages/CustomerDashboard.js';
import CustomerSearch from '../pages/CustomerSearch.js';
import CustomerSummary from '../pages/CustomerSummary.js';
import ProviderDashboard from '../pages/ProviderDashboard.js';
import ProviderSearch from '../pages/ProviderSearch.js';
import ProviderSummary from '../pages/ProviderSummary.js';
import ServicePage from '../pages/ServicePage.js';
import ProfilePage from '../pages/ProfilePage.js';

const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/profile', component: ProfilePage},
    
    // Admin routes
    {path: '/admin-dashboard', component: AdminDashboard},
    {path: '/admin-search', component: AdminSearch},
    {path: '/admin-summary', component: AdminSummary},
    
    // Customer routes
    {path: '/customer-dashboard', component: CustomerDashboard},
    {path: '/customer-search', component: CustomerSearch},
    {path: '/customer-summary', component: CustomerSummary},
    
    // Service Provider routes
    {path: '/provider-dashboard', component: ProviderDashboard},
    {path: '/provider-search', component: ProviderSearch},
    {path: '/provider-summary', component: ProviderSummary},
    
    // Service details page
    {path: '/service/:id', component: ServicePage} 
];

const router = new VueRouter({
    routes
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    
    next();
});

export default router;
