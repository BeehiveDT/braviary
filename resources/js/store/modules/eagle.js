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
                let _successResponse = response.data;
                let _myEagles = _successResponse.eagles.my_eagles;
                _myEagles.forEach(eagle => { eagle.view_only = false });
                let _linkEagles = _successResponse.eagles.link_eagles;
                _linkEagles.forEach(eagle => { eagle.view_only = true });
                let _eagleList = _myEagles.concat(_linkEagles);
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
                this.dispatch('zookeeper/retrieveEagleList');
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
               this.dispatch('zookeeper/retrieveEagleList');
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
                dispatch('retrieveEagleList');
                this.dispatch('zookeeper/retrieveEagleList');
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
            let _params = {'limit': payload.limit, 'skip': payload.skip};
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token, _params);
            let _url = BraviaryConfig.getAPI_URL('Get_Eagle_Feathers', payload);
            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _successResponse = response.data;
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
    addEagleViewer({ rootState }, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Add_Eagle_Viewer', payload);
            let _email = payload.email;

            axios.post(_url, _email, _authorizedHeader)
            .then(response => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            });
        })
    },
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
    deleteEagleViewer({ rootState}, payload){
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Delete_Eagle_Viewer', payload);

            axios.post(_url, payload.body, _authorizedHeader)
            .then(response => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
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
  