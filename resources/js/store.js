import axios from "axios";
import {router} from "./app.js"

// const API="http://braviary.test/api";

const BASEURL = setBaseURL();
const API = BASEURL + 'api';
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

function setBaseURL() {
    let origin = window.location.origin;
    let baseURL = origin;
    switch (window.location.hostname)
    {
        case 'localhost':               baseURL = origin + '/';
                                        break;
        case 'braviary.test':           baseURL = origin + '/';
                                        break;
        case 'xlab.agriweather.online': baseURL = 'https://xlab.agriweather.online/braviary/';
                                        break;
        default:                        baseURL = 'https://xlab.agriweather.online/braviary/';
                                        break;
    }
    return baseURL
}

export default {
    state: {
        userName: '',
        userToken: '',
        is_admin: false,
        userLoggedIn: false,
        eagles: [],
        homeMessage: `Home Page`,
    },
    // sync
    mutations: {
		initializeStore(state) {
			// if token exists, set state
			if(localStorage.getItem('token')) {
                state.userToken = localStorage.getItem('token');
                state.userName = localStorage.getItem('name');
                state.eagles = JSON.parse(localStorage.getItem('eagles'));
                state.userLoggedIn = true;
			}
        },
        resetStore(state){
            state.userName='';
            state.userToken='';
            state.is_admin=false;
            state.eagles=[];
        },
        updateUserToken(state, token){
            state.userToken = token;
            localStorage.setItem('token', token);
        },
        updateUserName(state, name){
            state.userName = name;
            localStorage.setItem('name', name);
        },
        updateUserLoggedIn(state){
            state.userLoggedIn = !state.userLoggedIn;
        },
        updateAdminStatus(state, is_admin){
            if(is_admin === '1'){
                state.is_admin = true;
            }
        },
        updateEagles(state, eagles){
            console.log(`updating`)
            eagles.sort(function(eagle1, eagle2) {
                // Descending order
                return eagle2.id - eagle1.id;
            });
            console.log(eagles)
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
        retrieveUserName({ state, commit }){
            return new Promise((resolve, reject) => {

                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                // 
                axios.get(`${API}/me`, authorizedHeader)
                .then(response => {
                    let _successResponse = response.data['Success'];
                    let _userName = _successResponse.name;
                    commit('updateUserName', _userName);
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
            })    
        },
        logInSubmit({ dispatch, commit }, payload){
            return new Promise((resolve, reject) => {

                // POST request to log in
                axios.post(`${API}/auth/login`, payload, headers)
                .then(response=> {
                    // success
                    let token = response.data.access_token;
                    let is_admin = response.data.is_admin;

                    commit('updateUserToken', token);
                    commit('updateUserLoggedIn');
                    commit('updateAdminStatus', is_admin);
                    dispatch('retrieveUserName');
                    dispatch('retrieveEagles');
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
                    let _errorMessage = error.response.data.error.message;
                    reject(_errorMessage);
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
                    commit('resetStore');
                    router.push('/');
                    resolve(response);
                })
              .catch( error => {
                    reject(error);
                })
            })
        },
        showUser({commit, state}){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                axios.get(`${API}/me`, authorizedHeader)
                .then(response => {
                    let successResponse = response.data['Success'];
                    let is_admin = successResponse.is_admin;
                    commit('updateAdminStatus', is_admin);
                    resolve(state.is_admin)
                })
                .catch((error) => {
                    reject(error);
                });
            })
        },
        updateUser({state, commit}, payload){
            return new Promise((resolve, reject) => {
                authorizedHeader.headers['Authorization'] = state.userToken;

                // POST request to update user
                axios.post(`${API}/me`, payload, authorizedHeader)
                .then(response=> {
                    // update user succeeded
                    if(payload.name){
                        commit('updateUserName', payload.name);
                    }
                    resolve(response);
                })
                .catch(error=>{
                    // update user failed
                    let errorMessage = error.response.data.error.message;
                    reject(errorMessage);
                })
            })
        },
        createEagle({ dispatch, state }, payload) {
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
        updateEagle({dispatch, state}, payload){
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
        deleteEagle({dispatch, state}, payload){
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
        // **
        // show eagles
        // **
        retrieveEagles({commit, state}){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                axios.get(`${API}/eagles`, authorizedHeader)
                .then(response => {
                    let successResponse = response.data["Success"]
                    let _linkEagles = successResponse.eagles.link_eagles;
                    let _myEagles = successResponse.eagles.my_eagles;
                    let eagles = _linkEagles.concat(_myEagles);
                    commit('updateEagles', eagles);
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
            })
        },
        // **
        // add eagle viewer
        // **
        addEagleViewer({state}, payload){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;
                let id = payload.id;
                let email = payload.email;

                axios.post(`${API}/eagles/${id}/link`, email, authorizedHeader)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
            })
        },
        // **
        // retrieve Eagle's list of viewers
        // **
        getEagleViewers({state}, payload){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                axios.get(`${API}/eagles/${payload.id}/viewers`, authorizedHeader)
                .then(response => {
                    let emails = response.data['Success']['viewers']
                    resolve(emails)
                })
                .catch((error) => {
                    reject(error)
                });
            })
        },
        deleteEagleViewer({state}, payload){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                axios.post(`${API}/eagles/${payload.id}/unlink`, payload.body, authorizedHeader)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
            })
        },
        // payload.limit is the number of feathres to retrieve
        // payload.limit  = 1 retrieves last feather
        retrieveEagleFeathers ({ state }, payload) {
            return new Promise((resolve, reject) => {
                let header = authorizedHeader;
                header.headers['Authorization'] = state.userToken;
                header.params = {'limit': payload.limit}

                let lastFeather = '';

                axios.get(`${API}/eagles/${payload.id}/feathers`, header)
                .then(response => {
                    let feathersArr = response.data['Success']['feathers']
                    if (feathersArr[0]){
                        lastFeather = feathersArr[0]
                    }else{
                        lastFeather = "None Found"
                    }
                    resolve(lastFeather);
                })
                .catch((error) => {
                    reject(error);
                });

            })
        },
        retrieveAllEagles({state}){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                axios.get(`${API}/zookeeper/eagles`, authorizedHeader)
                .then(response => {
                    let successResponse = response.data['Success']
                    resolve(successResponse.eagles);
                })
                .catch((error) => {
                    reject(error);
                });

            })

        },
        retrieveAllUsers({state}){
            return new Promise((resolve, reject) => {
                // Set user token for authorization
                authorizedHeader.headers['Authorization'] = state.userToken;

                axios.get(`${API}/zookeeper/users`, authorizedHeader)
                .then(response => {
                    let successResponse = response.data['Success']
                    resolve(successResponse.users);
                })
                .catch((error) => {
                    reject(error);
                });

            })

        }

    }
};