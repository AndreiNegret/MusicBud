Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        emotion: null
    },
    mutations: {
        setEmotion(state, emotion) {
            state.emotion = emotion;
        },
        setUser(state, user) {
            state.user = user;
        }
    }
});
