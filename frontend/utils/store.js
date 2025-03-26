
// const store = new Vuex.Store({
//     state: {
//         auth_token: null,
//         role: null,
//         loggedIn: false,
//         user_id: null,
//         user: null
//     },
//     mutations: {
//         setUser(state, user) {
//             state.auth_token = user.token;
//             state.role = user.role;
//             state.loggedIn = !!user.token;
//             state.user_id = user.id;
//             state.user = user;
//         }
//     },
//     getters: {
//         isLoggedIn: state => !!state.auth_token,
//         currentUser: state => state.user,
//         userRole: state => state.role
//     }
// });

// export default store;


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
            localStorage.setItem('token', user.token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('user_id', user.id);
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
        }
    },
    getters: {
        isLoggedIn: state => !!state.auth_token,
        currentUser: state => state.user,
        userRole: state => state.role
    }
});

export default store;
