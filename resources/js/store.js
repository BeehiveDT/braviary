import axios from "axios";
import {router} from "./app.js"

const API="http://braviary.test/api";
const headers = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const authorizedHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': ''
    }
}

export default {
    state: {
        userToken: '',
        userLoggedIn: false,
        eagles: [],
        homeMessage: `Home Page`,
    },
    // sync
    mutations: {
		initializeStore(state) {
			// if token exists, replace userToken in state
			if(localStorage.getItem('token')) {
                state.userToken = localStorage.getItem('token');
                state.eagles = JSON.parse(localStorage.getItem('eagles'));
                state.userLoggedIn = true;
			}
		},
        updateUserToken(state, token){
            state.userToken = token;
            // store token in localStorage
            localStorage.setItem('token', token);
        },
        updateUserLoggedIn(state){
            state.userLoggedIn = !state.userLoggedIn;
        },
        updateEagles(state, eagles){
            state.eagles = eagles;
            localStorage.setItem('eagles', JSON.stringify(eagles));
        }
    },
    getters: {
        homeMessage(state) {
            return state.homeMessage;
        },
    },
    // async
    actions: {
        logInSubmit({ dispatch, commit }, payload){
            return new Promise((resolve, reject) => {

                let data = JSON.stringify(payload)

                // POST request to log in
                axios.post(`${API}/auth/login`, payload, headers)
                .then(response=> {
                    // success
                    let token = response.data.access_token;
                    commit('updateUserToken', token);
                    commit('updateUserLoggedIn');
                    dispatch('retrieveEagles')
                    router.push('/eagles');
                    resolve(response);
                })
                .catch(error=>{
                    reject(error.response);
                })
            })
        },
        signUpSubmit ({ commit }, payload) {
            return new Promise((resolve, reject) => {

                // POST request to sign up
                axios.post(`${API}/auth/register`, payload, headers)
                .then(response=> {
                    // success
                    router.push('/log-in');
                    resolve(response);
                })
                .catch(error=>{
                    // signup failed
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
                    localStorage.clear();
                    router.push('/');
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
        },
        createEagle({ dispatch, commit, state }, payload) {
            return new Promise((resolve, reject) => {
                authorizedHeader.headers['Authorization'] = state.userToken;
                
                // POST request to create eagle
                axios.post(`${API}/eagles`, payload, authorizedHeader)
                .then(response=> {
                    // success
                    dispatch('retrieveEagles')
                    resolve(response);
                })
                .catch(error=>{
                    // creation failed
                    reject(error);
                })
            })
        },
        updateEagle({dispatch, commit, state}, payload){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

               // POST request to update eagle
               axios.post(`${API}/eagles/${payload.id}`, payload.eagle, authorizedHeader)
               .then(response=> {
                   // success
                   dispatch('retrieveEagles')
                   resolve(response);
               })
               .catch(error=>{
                   // creation failed
                   reject(error);
               })
            })
        },
        deleteEagle({dispatch, commit, state}, payload){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                // {{BaseURL}}/eagles/26
                axios.delete(`${API}/eagles/${payload.id}`, authorizedHeader)
                .then(response=> {
                    // success
                    dispatch('retrieveEagles')
                    resolve(response);
                })
                .catch(error=>{
                    // creation failed
                    reject(error);
                })
            })
        },
        retrieveEagles({commit, state}){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                axios.get(`${API}/eagles`, authorizedHeader)
                .then(response => {
                    let successResponse = response.data["Success"]
                    let eagles = successResponse.eagles.my_eagles
                    commit('updateEagles', eagles)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
            })
        }
    }
};