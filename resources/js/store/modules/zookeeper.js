import axios from "axios";
import { config as BraviaryConfig } from '../../config';

// initial state
const state = {
    zookeeperEaglesList: [],
    zookeeperUsersList: []
}
  
// getters
const getters = {
    
}
  
// actions
const actions = {
    // ------------------------------------------------------------------
    // Eagles
    // ------------------------------------------------------------------
    retrieveEaglesList({commit, rootState}){	
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Zookeeper_Eagle_List');
            axios.get(_url, _authorizedHeader)
            .then(response => {
                let _zookeeperEaglesList = response.data;
                commit('updateEaglesList', _zookeeperEaglesList);
                resolve(_zookeeperEaglesList);
            })	
            .catch((error) => {	
                reject(error);	
            });	              
        })
    },
    retrieveUsersList({commit, rootState}){	
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Zookeeper_User_List');
            axios.get(_url, _authorizedHeader)
            .then(response => {	
                let _zookeeperUsersList = response.data;
                commit('updateUsersList', _zookeeperUsersList);
                resolve(_zookeeperUsersList);
            })	
            .catch((error) => {	
                reject(error);	
            });	              
        })
    },
}
  
// mutations
const mutations = {
    updateEaglesList(state, zookeeperEaglesList){
        zookeeperEaglesList.sort(function(eagle1, eagle2) {
            // Descending order
            return eagle2.id - eagle1.id;
        });
        state.zookeeperEaglesList = zookeeperEaglesList;
    },
    updateUsersList(state, zookeeperUsersList){
        state.zookeeperUsersList = zookeeperUsersList;
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  