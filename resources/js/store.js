export default {
    state: {
        userToken: '',
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
    mutations: {
        userLogIn(state, token){
            state.usertoken = token;
            console.log(`userToken: ${ token}`);
        }
    },
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