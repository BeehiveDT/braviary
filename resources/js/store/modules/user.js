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
    // ------------------------------------------------------------------
    // Log In/Out
    // ------------------------------------------------------------------
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
                dispatch('retrieveUserProfile');
                router.push('/eagles');
                resolve(response);
            })
            .catch(error=>{
                reject(error);
            })
        })
    },
    logOutUser({commit, state})
    {
        return new Promise((resolve, reject) => {
            let _token = state.userToken;
            let _url = BraviaryConfig.getAPI_URL('Log_Out_User');
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);

            let config = {
                method:'POST',
                url: _url,
                headers: _authorizedHeader.headers
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
    retrieveUserProfile ({ state, commit })
    {
        return new Promise((resolve, reject) => {
            console.log(`retrieve user profile`)
            let _token = state.userToken;
            let _url = BraviaryConfig.getAPI_URL('Show_User_Profile');
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);

            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _successResponse = response.data['Success'];
                let _userName = _successResponse.name;
                let _isAdmin = _successResponse.is_admin;
                commit('updateUserName', _userName);
                commit('updateAdminStatus', _isAdmin);
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
    resetStore(state){
        state.userToken = undefined;
        state.userLoggedIn = false;
        state.userIsAdmin = false;
        state.userName = undefined;
    },   
    updateUserToken (state, token)
    {
        state.userToken = token;
        localStorage.setItem('token', token);
    },
    updateUserLoggedIn (state)
    {
        state.userLoggedIn = !state.userLoggedIn;
    },
    updateAdminStatus (state, isAdmin)
    {
        if(isAdmin === '1'){
            state.userIsAdmin = true;
        }
    },
    updateUserName (state, name){
        state.userName = name;
    }, 
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  