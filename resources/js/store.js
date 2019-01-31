import axios from "axios";
import {router} from "./app.js"

const API="http://braviary.test/api";
const headers = {
    headers: {
        'Content-Type': 'application/json'
    }
}

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
            // console.log(email);
        },
        updatePassword(state, password){
            state.password = password;
            // console.log(password);
        },
        updateUserToken(state, token){
            state.userToken = token;
            // store token in localStorage
            localStorage.setItem('token', JSON.stringify(token));
            router.push('/');
        },
    },
    getters: {
        homeMessage(state) {
            return state.homeMessage;
        },
    },
    // async
    actions: {
        logInSubmit({ commit }, payload){
            // extract email and password from payload
            // let email = payload.email;
            // let password = payload.password;

            // let data = JSON.stringify(payload)

            // POST request to log in
            axios.post(`${API}/auth/login`, payload, headers)
            .then(response=> {
                // success
                let token = response.data.access_token;
                commit('updateUserToken', token)
            })
            .catch(error=>{
                // relog setup
                commit('updateEmail', '');
                commit('updatePassword', '');
                console.log("cannot log in");
            })
        },
        signUpSubmit ({ commit }, payload) {
            return new Promise((resolve, reject) => {

                let data = JSON.stringify(payload)

                // POST request to sign up
                axios.post(`${API}/auth/register`, payload, headers)
                .then(response=> {
                    // success
                    router.push('/log-in');
                    resolve(response);
                })
                .catch(error=>{
                    // signup failed
                    console.log(error);
                    reject(error);
                })
            })
          }
    }
};