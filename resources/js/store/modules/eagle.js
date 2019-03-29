import axios from "axios";
import { config as BraviaryConfig } from '../../config';

// initial state
const state = {
    eagleList: []
}
  
// getters
const getters = {
    
}
  
// actions
const actions = {
    // ------------------------------------------------------------------
    // Eagles
    // ------------------------------------------------------------------
    retrieveEagleList({ commit, rootState }){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagle_List');
            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _successResponse = response.data["Success"];
                let _linkEagles = _successResponse.eagles.link_eagles;
                let _myEagles = _successResponse.eagles.my_eagles;
                let _eagleList = _linkEagles.concat(_myEagles);
                commit('updateEagleList', _eagleList);
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            });
        })
    },
    // ------------------------------------------------------------------
    // Eagle
    // ------------------------------------------------------------------
    createEagle({ dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Create_Eagle');
            
            axios.post(_url, payload, _authorizedHeader)
            .then(response=> {
                // // success
                dispatch('retrieveEagleList')
                resolve(response);
            })
            .catch(error=>{
                // // creation failed
                reject(error);
            })
        })
    },
    updateEagle({dispatch, rootState}, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Update_Eagle', payload);
            let _eagle = payload.eagle;

           // POST request to update eagle
           axios.post(_url, _eagle, _authorizedHeader)
           .then(response=> {
               dispatch('retrieveEagleList')
               resolve(response);
           })
           .catch(error=>{
               reject(error);
           })
        })
    },
    deleteEagle({ dispatch, rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Delete_Eagle', payload);

            axios.delete(_url, _authorizedHeader)
            .then(response=> {
                // success
                dispatch('retrieveEagleList')
                resolve(response);
            })
            .catch(error=>{
                reject(error);
            })
        })
    },
    retrieveEagleFeathers({ rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _params = {'limit': payload.limit};
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token, _params);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagle_Feathers', payload);

            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _successResponse = response.data['Success'];
                resolve(_successResponse);
            })
            .catch((error) => {
                reject(error);
            });
        })
    },
    // ------------------------------------------------------------------
    // Eagle Viewer
    // ------------------------------------------------------------------
    getEagleViewers({ rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagle_Viewers', payload);

            axios.get(_url, _authorizedHeader)
            .then(response => {
                let emails = response.data['Success']['viewers']
                resolve(emails)
            })
            .catch((error) => {
                reject(error)
            });
        })
    },

}
  
// mutations
const mutations = {
    updateEagleList(state, eagleList){
        eagleList.sort(function(eagle1, eagle2) {
            // Descending order
            return eagle2.id - eagle1.id;
        });
        state.eagleList = eagleList;
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  