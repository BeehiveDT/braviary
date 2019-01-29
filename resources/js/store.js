import axios from "axios";
const API="http://braviary.test/api";

export default {
    state: {
        userToken: '',
        email: '',
        password: '',
        homeMessage: `
            Home Page
        `,
        signUpMessage: `
            Sign Up Page
        `,
    },
    mutations: {
        updateEmail(state, email){
            state.email = email;
            console.log(email);
        },
        updatePassword(state, password){
            state.password = password;
            console.log(password);
        },
        userLogIn(state, payload){
            // extract email and password from payload
            // console.log(payload.email);
            // console.log(payload.password);

            let email = payload.email;
            let password = payload.password;

            axios.post(`${API}/auth/login`, {
                email,
                password
            })
            .then(response=> {
                // success
                let token = response.data.access_token;
                state.userToken = token;
                console.log(`userToken: ${ token}`);
            })
            .catch(error=>{
                // relog setup
                console.log("cannot log in")
            })
        },
    },
    getters: {
        homeMessage(state) {
            return state.homeMessage;
        },
        signUpMessage(state){
            return state.signUpMessage;
        },
    },
    actions: {
        logInSubmit({commit}, payload){
            commit('userLogIn',  payload )
        }
    }
};