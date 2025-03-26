import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import RegisterPage from '../pages/RegisterPage.js';
import AdminDashboard from '../pages/AdminDashboard.js';
import CustomerDashboard from '../pages/CustomerDashboard.js';
import ProviderDashboard from '../pages/ProviderDashboard.js';
import ServicePage from '../pages/ServicePage.js';

const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/admin-dashboard', component: AdminDashboard},
    {path: '/customer-dashboard', component: CustomerDashboard},
    {path: '/provider-dashboard', component: ProviderDashboard},
    {path: '/service/:id', component: ServicePage} 
];

const router = new VueRouter({
    routes
});

export default router;
