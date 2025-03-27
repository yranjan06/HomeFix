// 



const store = new Vuex.Store({
    state: {
        auth_token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        loggedIn: !!localStorage.getItem('token'),
        user_id: localStorage.getItem('user_id') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    },
    mutations: {
        setUser(state, user) {
            state.auth_token = user.token;
            state.role = user.role;
            state.loggedIn = !!user.token;
            state.user_id = user.id;
            state.user = user;
            
            // Store in localStorage for persistence
            if (user.token) localStorage.setItem('token', user.token);
            if (user.role) localStorage.setItem('role', user.role);
            if (user.id) localStorage.setItem('user_id', user.id);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Store phone number if available
            if (user.phone_number) {
                localStorage.setItem('phone', user.phone_number);
            }
        },
        clearUser(state) {
            state.auth_token = null;
            state.role = null;
            state.loggedIn = false;
            state.user_id = null;
            state.user = null;
            
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user');
            localStorage.removeItem('phone');
        },
        updateUserProfile(state, profileData) {
            state.user = { ...state.user, ...profileData };
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    },
    getters: {
        isLoggedIn: state => !!state.auth_token,
        currentUser: state => state.user,
        userRole: state => state.role,
        getHomeRoute: state => {
            const role = state.role;
            if (role === 'admin') return '/admin-dashboard';
            if (role === 'customer') return '/customer-dashboard';
            if (role === 'service_provider') return '/provider-dashboard';
            return '/login';
        },
        getSearchRoute: state => {
            const role = state.role;
            if (role === 'admin') return '/admin-search';
            if (role === 'customer') return '/customer-search';
            if (role === 'service_provider') return '/provider-search';
            return '/login';
        },
        getSummaryRoute: state => {
            const role = state.role;
            if (role === 'admin') return '/admin-summary';
            if (role === 'customer') return '/customer-summary';
            if (role === 'service_provider') return '/provider-summary';
            return '/login';
        }
    },
    actions: {
        login({ commit }, userData) {
            return new Promise((resolve, reject) => {
                // You would typically make an API call here
                // For now, we'll just commit the user data
                commit('setUser', userData);
                resolve(userData);
            });
        },
        logout({ commit }) {
            commit('clearUser');
            return Promise.resolve();
        }
    }
});

export default store;
