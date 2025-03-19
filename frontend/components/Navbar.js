export default {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-gray-900 shadow-sm">
        <div class="container">
            <router-link class="navbar-brand fw-light d-flex align-items-center" to="/">
                <i class="fas fa-home me-2"></i>
                <span class="text-white">HomeFix</span>
            </router-link>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link px-3" to="/services">Services</router-link>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav-link px-3" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="btn btn-outline-light rounded-0 px-4" to="/register">Register</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="isLoggedIn">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                           data-bs-toggle="dropdown" aria-expanded="false">
                            My Account
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end bg-gray-800 border-0 rounded-0" aria-labelledby="navbarDropdown">
                            <li><router-link class="dropdown-item text-gray-400" :to="getDashboardRoute">Dashboard</router-link></li>
                            <li><hr class="dropdown-divider border-gray-700"></li>
                            <li><a class="dropdown-item text-gray-400" href="#" @click.prevent="logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `,
    computed: {
        isLoggedIn() {
            return this.$store.state.loggedIn;
        },
        userRole() {
            return this.$store.state.role;
        },
        getDashboardRoute() {
            const role = this.userRole;
            if (role === 'admin') return '/admin-dashboard';
            if (role === 'customer') return '/customer-dashboard';
            if (role === 'service_provider') return '/provider-dashboard';
            return '/';
        }
    },
    methods: {
        logout() {
            this.$store.commit('setUser', {
                token: null,
                role: null,
                id: null
            });
            this.$router.push('/login');
        }
    }
}