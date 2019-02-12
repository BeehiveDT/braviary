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
        // email: '',
        // password: '',
        userLoggedIn: false,
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
        // updateEmail(state, email){
        //     state.email = email;
        //     // console.log(email);
        // },
        // updatePassword(state, password){
        //     state.password = password;
        //     // console.log(password);
        // },
        updateUserToken(state, token){
            state.userToken = token;
            // store token in localStorage
            localStorage.setItem('token', JSON.stringify(token));
            router.push('/');
        },
        updateUserLoggedIn(state){
            state.userLoggedIn = !state.userLoggedIn;
        }
    },
    getters: {
        homeMessage(state) {
            return state.homeMessage;
        },
    },
    // async
    actions: {
        logInSubmit({ commit }, payload){
            return new Promise((resolve, reject) => {

                let data = JSON.stringify(payload)

                // POST request to log in
                axios.post(`${API}/auth/login`, payload, headers)
                .then(response=> {
                    // success
                    let token = response.data.access_token;
                    commit('updateUserToken', token);
                    commit('updateUserLoggedIn');
                    resolve(response);
                })
                .catch(error=>{
                    // relog setup
                    // commit('updateEmail', '');
                    // commit('updatePassword', '');
                    // console.log(error.response);
                    reject(error.response);
                })
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
        },
        userLogOut({commit, state}){
            return new Promise((resolve, reject) => {

                const logOutHeader = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': state.userToken
                }

                const config = {
                    method:'POST',
                    url: `${API}/auth/logout`,
                    headers: logOutHeader
                }

                axios(config)
                .then( response => {
                    commit('updateUserLoggedIn');
                    commit('updateUserToken', '');
                    resolve(response);
                })
                .catch( error => {
                    reject(error);
                })

                // CANNOT USE CUZ NO BODY -.-
                // axios.post(`${API}/auth/logout`, "{}", logOutHeader)
                // axios.post(`${API}/auth/logout`)
                // .then(response=> {
                //     console.log("logged out")
                //     commit('updateUserLoggedIn')
                //     router.push('/');
                //     resolve(response);
                // })
                // .catch(error=>{
                //     // logout failed
                //     console.log("why...")
                //     console.log(error);
                //     reject(error);
                // })
            })
        }
    }
};