const store = new Vuex.Store({
    state: {
        auth_token: null,
        role: null,
        loggedIn: false,
        user_id: null,
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.auth_token = user.token;
            state.role = user.role;
            state.loggedIn = !!user.token;
            state.user_id = user.id;
            state.user = user;
            
        }
    },
    getters: {
        isLoggedIn: state => !!state.auth_token,
        currentUser: state => state.user,
        userRole: state => state.role
    }
});

export default store;
