import axios from "axios";
import { config as BraviaryConfig } from '../../config';
import {router} from "../../app.js";

// initial state
const state = {
    userToken: undefined,
    userLoggedIn: false,
    userIsAdmin: false,
    userName: undefined,
}

// getters
const getters = {

}

// actions
const actions = {
logInUser({ dispatch, commit }, payload)
{
    return new Promise((resolve, reject) => {
        let _url = BraviaryConfig.getAPI_URL('Log_In_User');
        let _header = BraviaryConfig.HEADER;

        axios.post(_url, payload, _header)
        .then(response=> {
            // success
            let _token = response.data.access_token;
            let _isAdmin = response.data.is_admin;

            commit('updateUserToken', _token);
            commit('updateUserLoggedIn');
            commit('updateAdminStatus', _isAdmin);
            dispatch('retrieveUserName');
            router.push('/eagles');
            resolve(response);
        })
        .catch(error=>{
            reject(error);
        })
    })
},
retrieveUserName ({ state, commit })
{
    return new Promise((resolve, reject) => {

        let _authorizedHeader = BraviaryConfig.AUTHORIZED_HEADER;
        let _url = BraviaryConfig.getAPI_URL('Show_User_Profile');

        _authorizedHeader.headers['Authorization'] = state.userToken;

        axios.get(_url, _authorizedHeader)
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
}

// mutations
const mutations =
{
initializeStore (state) 
{
    // if token exists, set state
    if(localStorage.getItem('token')) {
        state.userToken = localStorage.getItem('token');
        state.userName = localStorage.getItem('name');
        state.userLoggedIn = true;
    }
},
updateUserToken (state, token)
{
    state.userToken = token;
    localStorage.setItem('token', token);
    console.log(`user token ${state.userToken}`);
},
updateUserLoggedIn (state)
{
    state.userLoggedIn = !state.userLoggedIn;
    console.log(`is logged in ${state.userLoggedIn}`);
},
updateAdminStatus (state, isAdmin)
{
    if(isAdmin === '1'){
        state.userIsAdmin = true;
    }
    console.log(`is admin ${state.userIsAdmin}`);
},
updateUserName (state, name){
    state.userName = name;
    localStorage.setItem('name', name);
    console.log(`user name is ${state.userName}`);
}, 
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  