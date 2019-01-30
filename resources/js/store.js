import axios from "axios";

const API="http://braviary.test/api";

export default {
    state: {
        userToken: '',
        email: '',
        password: '',
        homeMessage: `Home Page`,
    },
    // sync
    mutations: {
		initializeStore(state) {
			// if token exists, replace userToken in state
			if(localStorage.getItem('token')) {
                state.userToken = localStorage.getItem('token')
			}
		},
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
            let email = payload.email;
            let password = payload.password;

            // POST request to log in
            axios.post(`${API}/auth/login`, {
                email,
                password
            })
            .then(response=> {
                // success
                let token = response.data.access_token;
                state.userToken = token;
                console.log(`userToken: ${ token}`);
                // store token in localStorage
                localStorage.setItem('token', JSON.stringify(token));
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
    },
    // async
    actions: {
        logInSubmit({commit}, payload){
            commit('userLogIn',  payload )
        }
    }
};