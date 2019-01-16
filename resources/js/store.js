export default {
    state: {
        homeMessage: `
            Home Page
        `,
        signUpMessage: `
            Sign Up Page
        `,
        logInMessage: `
            Log In Page
        `
    },
    mutations: {},
    getters: {
        homeMessage(state) {
            return state.homeMessage;
        },
        signUpMessage(state){
            return state.signUpMessage;
        },
        logInMessage(state){
            return state.logInMessage;
        }
    },
    actions: {}
};