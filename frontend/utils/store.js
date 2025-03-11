const store = new Vuex.Store({
    state : {
        // like data in Vue instance
        auth_token : null,
        role : null,
        loggedIn : false,
        user_id : null,

    },
    mutations : {
        // function that change state
        setUser(state, user){
            state.auth_token = user.token
            state.role = user.role
            state.loggedIn = true
            state.user_id = user.id
        }
    },
    actions : {
        // action commit mutations can be async
    }
})

export default store